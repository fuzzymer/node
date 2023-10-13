import { cac } from 'cac'
import { FuzzyHttp } from '@fuzzymer/http'

const cli = cac('fuzzymer')

cli
  .command('test <url>', 'Test a template url')
  .option('--exit-on-error', 'Exit on error')
  .action(async (url: string, options: Record<string, boolean>) => {
    const http = new FuzzyHttp({ exitOnError: !!options.exitOnError })
    await http.get(url);
  })
