export function hasMathContent(body: string): boolean {
  return /\$\$[\s\S]+?\$\$|\$[^$\n]+\$/.test(body);
}
