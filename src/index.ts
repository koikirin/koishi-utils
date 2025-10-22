export function splitBackslashEscapedArgs(input: string, delimiter: RegExp = /\s|,|\|\|/): string[] {
  const regex = new RegExp(/\\[\s\S]|/.source + delimiter.source)
  const args: string[] = []
  let startIndex = 0, lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(input.slice(lastIndex))) !== null) {
    const [fullMatch] = match

    if (!fullMatch.startsWith('\\')) {
      const arg = input.slice(startIndex, lastIndex + match.index).replace(/\\([\s\S])/g, '$1')
      startIndex = lastIndex + match.index + fullMatch.length

      if (arg) args.push(arg)
    }
    lastIndex += match.index + fullMatch.length
  }

  const lastArg = input.slice(startIndex).replace(/\\([\s\S])/g, '$1')
  if (lastArg) args.push(lastArg)
  return args
}
