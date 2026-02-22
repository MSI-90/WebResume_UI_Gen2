
export default function ENV(key: string): string | undefined {
  const env_variables = import.meta.env;
  if (!env_variables || !key) return undefined;

  return env_variables[key as keyof ImportMetaEnv] as string;
}