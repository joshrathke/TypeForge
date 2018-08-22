export interface ForgeConfig {
    multithreading: boolean;
    APIPort: number;
}

export type ForgeEnvironment =
    "development" |
    "production" |
    "testing"