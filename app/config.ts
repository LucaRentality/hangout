export type AppState = "coming-soon" | "open"

export interface AppConfig {
  websiteState: AppState
  appState: AppState
}

export let appConfig: AppConfig = {
  websiteState: "open",
  appState: "open",
}

export function updateAppConfig(newConfig: Partial<AppConfig>) {
  appConfig = { ...appConfig, ...newConfig }
}
