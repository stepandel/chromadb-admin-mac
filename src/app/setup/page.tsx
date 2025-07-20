'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { useGetConfig } from '@/lib/client/query'
import { updateConfig } from '@/lib/client/localstorage'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SetupPage() {
  const router = useRouter()
  const { data: appConfig } = useGetConfig()
  const [connectionString, setConnectionString] = useState(appConfig?.connectionString || '')
  const [tenant, setTenant] = useState(appConfig?.tenant || 'default_tenant')
  const [database, setDatabase] = useState(appConfig?.database || 'default_database')
  const [authType, setAuthType] = useState(appConfig?.authType || 'no_auth')
  const [username, setUsername] = useState(appConfig?.username || '')
  const [password, setPassword] = useState(appConfig?.password || '')
  const [token, setToken] = useState(appConfig?.token || '')

  useEffect(() => {
    if (appConfig != null && appConfig.connectionString) {
      setConnectionString(appConfig.connectionString)
    }
  }, [appConfig])

  const queryClient = useQueryClient()

  const connectButtonClicked = () => {
    let formattedConnectionString = connectionString.trim()

    try {
      // Add http:// if no protocol specified
      if (!formattedConnectionString.startsWith('http://') && !formattedConnectionString.startsWith('https://')) {
        formattedConnectionString = 'http://' + formattedConnectionString
      }

      // Parse the URL
      const url = new URL(formattedConnectionString)

      // If no port specified, add default port 8000
      if (!url.port) {
        url.port = '8000'
        formattedConnectionString = url.toString()
      }

      // Remove trailing slash if exists
      formattedConnectionString = formattedConnectionString.replace(/\/$/, '')
    } catch (error) {
      console.error(error)
      alert('Invalid connection string format. Please use format: http://hostname:port or https://hostname:port')
      return
    }

    updateConfig({
      connectionString: formattedConnectionString,
      authType,
      username,
      password,
      token,
      currentCollection: '',
      tenant,
      database,
    })
    queryClient.setQueryData(['config'], {
      connectionString: formattedConnectionString,
      tenant,
      database,
    })
    router.push('/collections')
  }

  const backButtonClicked = () => {
    router.push('/collections')
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Chromadb Admin</h1>
      <Card className="p-8 border shadow-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="connectionString">Chroma connection string</Label>
            <Input
              id="connectionString"
              placeholder="http://localhost:8000"
              value={connectionString}
              onChange={e => setConnectionString(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">For example, http://localhost:8000</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenant">Tenant</Label>
            <Input id="tenant" placeholder="default_tenant" value={tenant} onChange={e => setTenant(e.target.value)} />
            <p className="text-sm text-muted-foreground">The tenant to set.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="database">Database</Label>
            <Input
              id="database"
              placeholder="default_database"
              value={database}
              onChange={e => setDatabase(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">The database to set.</p>
          </div>

          <div className="space-y-3">
            <Label>Authentication Type</Label>
            <RadioGroup value={authType} onValueChange={setAuthType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no_auth" id="no_auth" />
                <Label htmlFor="no_auth">No Auth</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="token" id="token" />
                <Label htmlFor="token">Token</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic">Basic</Label>
              </div>
            </RadioGroup>
          </div>

          {authType === 'token' && (
            <div className="space-y-2">
              <Label htmlFor="tokenInput">Token</Label>
              <Input
                id="tokenInput"
                placeholder="Enter your token"
                value={token}
                onChange={e => setToken(e.target.value)}
              />
            </div>
          )}

          {authType === 'basic' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            {appConfig?.connectionString && (
              <Button variant="outline" onClick={backButtonClicked}>
                Back
              </Button>
            )}
            <Button onClick={connectButtonClicked}>Connect</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
