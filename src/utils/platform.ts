/**
 * プラットフォーム名を表示用にフォーマット
 */
export function formatPlatformName(platform: string): string {
  const platformMap: Record<string, string> = {
    twitter: 'Twitter',
    instagram: 'Instagram',
    mixi2: 'mixi2',
  };

  return platformMap[platform] || platform;
}
