import requiredArgs from '../_lib/requiredArgs/index'

var nr = '\\d+(?:[\\.,]\\d+)?'
var dateRegex = '(' + nr + 'Y)?(' + nr + 'M)?(' + nr + 'D)?'
var timeRegex = 'T(' + nr + 'H)?(' + nr + 'M)?(' + nr + 'S)?'
var durationRegex = new RegExp('P' + dateRegex + '(?:' + timeRegex + ')?')

/**
 * @name parseISODuration
 * @category Common Helpers
 * @summary Parse ISO duration string
 *
 * @description
 * Parse the given string in ISO 8601 duration format and return an instance of Duration.
 *
 * Function accepts complete ISO 8601 formats.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns null.
 *
 * @param {String} argument - the value to convert
 * @returns {Duration | null} the parsed duration or null
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert string 'P1DT5M30S' to duration:
 * var result = parseISO('P1HT5M30S')
 * //=> { days: 1, minutes: 5, seconds: 30 }
 */
export default function parseISODuration(argument) {
  requiredArgs(1, arguments)

  if (
    !(
      typeof argument === 'string' ||
      Object.prototype.toString.call(argument) === '[object String]'
    )
  ) {
    return null
  }

  var match = argument.match(durationRegex)
  if (!match) {
    return null
  }

  // at least one part must be specified
  if (
    !match[1] &&
    !match[2] &&
    !match[3] &&
    !match[4] &&
    !match[5] &&
    !match[6]
  ) {
    return null
  }

  var duration = {}
  if (match[1]) duration.years = parseFloat(match[1])
  if (match[2]) duration.months = parseFloat(match[2])
  if (match[3]) duration.days = parseFloat(match[3])
  if (match[4]) duration.hours = parseFloat(match[4])
  if (match[5]) duration.minutes = parseFloat(match[5])
  if (match[6]) duration.seconds = parseFloat(match[6])
  return duration
}
