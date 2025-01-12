type LogTaskFunctionArguments = {
  alert: boolean
  bold: boolean
  check: boolean
  cross: boolean
  green: boolean
  italic: boolean
  label: string
  message: string
  noTime: boolean
  red: boolean
  timerStart: boolean
  timerStop: boolean
  yellow: boolean
  wait: boolean
}

enum AnsiCode {
  Bold = 1,
  BrightCyan = 96,
  BrightGreen = 92,
  BrightRed = 91,
  BrightYellow = 93,
  BrightWhite = 97,
  Dim = 2,
  Italic = 3,
  RemoveAll = 0,
  RemoveBoldDim = 22,
  RemoveColor = 39,
  RemoveItalic = 23,
}

enum Icon {
  Alert = '⚠ ',
  Check = '✓ ',
  Cross = '✖ ',
  Dot = '· ',
  Hourglass = '⌛',
}

const ANSI_SEQUENCE_PREFIX = '\x1b['

const ANSI_SEQUENCE_SUFFIX = 'm'

const DEFAULT_TIMER_KEY = '__default__'

export const ansiConcat = (...values: (AnsiCode | string)[]) =>
  values
    .reduce((result: (AnsiCode[] | string)[], value) => {
      if (typeof value === 'string') result.push(value as string)
      else {
        if (result.length === 0 || !Array.isArray(result.at(-1))) result.push([])
        ;(result.at(-1) as AnsiCode[]).push(value as AnsiCode)
      }
      return result
    }, [])
    .map((segment: AnsiCode[] | string) => (Array.isArray(segment) ? `${ANSI_SEQUENCE_PREFIX}${segment.join(';')}${ANSI_SEQUENCE_SUFFIX}` : segment))
    .join('')

export default ({ alert, bold, check, cross, green, italic, label, message, noTime, red, timerStart, timerStop, yellow, wait }: LogTaskFunctionArguments) => {
  const colorCode = green ? AnsiCode.BrightGreen : red ? AnsiCode.BrightRed : yellow ? AnsiCode.BrightYellow : AnsiCode.BrightCyan
  const icon = alert ? Icon.Alert : check ? Icon.Check : cross ? Icon.Cross : wait ? Icon.Hourglass : Icon.Dot
  const linePrefixValues = []

  if (!noTime) linePrefixValues.push(AnsiCode.Dim, AnsiCode.BrightWhite, new Date().toLocaleTimeString(), AnsiCode.RemoveBoldDim, ' ')

  linePrefixValues.push(colorCode, icon, AnsiCode.RemoveColor)

  if (label) {
    if (bold) linePrefixValues.push(AnsiCode.Bold)
    if (italic) linePrefixValues.push(AnsiCode.Italic)

    linePrefixValues.push(colorCode, label, AnsiCode.RemoveColor)

    if (bold) linePrefixValues.push(AnsiCode.RemoveBoldDim)
    if (italic) linePrefixValues.push(AnsiCode.RemoveItalic)

    linePrefixValues.push(' ')
  }

  const lineBegin = ansiConcat(...linePrefixValues)

  if (timerStart || timerStop) {
    const key = label || DEFAULT_TIMER_KEY

    if (timerStop && timerStartTimes[key]) {
      const duration = Date.now() - timerStartTimes[key]

      if (!message) message = 'Completed'

      message = `${message} in ${duration > 1000 ? `${duration / 1000}s` : `${duration}ms`}`

      delete timerStartTimes[key]
    } else if (timerStart) {
      timerStartTimes[key] = Date.now()

      if (!message) message = 'Started...'
    }
  }

  if (!message) message = ''

  const lines = String(message).split('\n')

  for (const line of lines) console.log(`${lineBegin}${line.trimEnd()}`)
}

const timerStartTimes: Record<string, number> = {}
