import { ConfigProvider, theme } from 'antd'
import { antdTokens } from './token'
import type { ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: antdTokens,
        components: {
          Button: {
            colorPrimary: antdTokens.colorPrimary,
            colorPrimaryHover: antdTokens.colorPrimaryHover,
            colorPrimaryActive: antdTokens.colorPrimaryActive,
            borderRadius: 6,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
