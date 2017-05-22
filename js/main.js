(function () {
    'use strict'

    class Countdown {
        static leftPadZero(t, digits = 2) {
            let pad = ''
            for (let i = digits - 1; i > 0; i--) pad += '0'

            return `${pad}${t}`.slice(-digits)
        }

        constructor(endDate, elSelector = Countdown.DEFAULTS.selector) {
            this.countdownDate = endDate instanceof Date
                ? endDate.getTime()
                : new Date(endDate).getTime()

            this.element = document.querySelector(elSelector)
            this.intervalId = null
            this.countdown = this.countdown.bind(this)
        }

        start(interval = Countdown.SECOND, runAtStart = true) {
            if (runAtStart) this.countdown()
            this.intervalId = window.setInterval(this.countdown, interval)

            return this
        }

        stop() {
            if (this.intervalId !== null) {
                window.clearInterval(this.intervalId)
            }

            return this
        }

        countdown() {
            const t = this.getTime()

            if (t.total > 0) {
                this.render(t)
            } else {
                this.stop().renderComplete()
            }

            return this
        }

        getTime() {
            // Get today's date and time
            const now = new Date().getTime()

            // Find the distance between now an the count down date in ms
            const total = this.countdownDate - now

            const d = Math.floor(total / Countdown.DAY)
            const h = Math.floor((total % Countdown.DAY) / Countdown.HOUR)
            const m = Math.floor((total % Countdown.HOUR) / Countdown.MINUTE)
            const s = Math.floor((total % Countdown.MINUTE) / Countdown.SECOND)
            const ms = Math.floor(total % Countdown.SECOND)

            return { d, h, m, s, ms, total }
        }

        render(t) {
            // format fn
            const f = Countdown.leftPadZero
            const times = [`${t.d}d`, `${f(t.h)}h`, `${f(t.m)}m`, `${f(t.s)}s`]

            this.element.innerHTML = times.join(`&nbsp;&nbsp;`)

            return this
        }

        renderComplete() {
            this.element.innerHTML = Countdown.DEFAULTS.doneText

            return this
        }

        static get SECOND() {
            return 1000
        }

        static get MINUTE() {
            return 60 * Countdown.SECOND
        }

        static get HOUR() {
            return 60 * Countdown.MINUTE
        }

        static get DAY() {
            return 24 * Countdown.HOUR
        }

        static get DEFAULTS() {
            return {
                selector: '#countdown-display',
                doneText: "EXPIRED",
            }
        }
    }

    const countdownDate = "May 16, 2017 12:00:00 GMT-0700"
    let datetime = new Date(countdownDate)

    if (Date.now() > datetime.getTime()) {
        datetime.setDate(new Date().getDate() + 1)
    }

    window.countdown = new Countdown(datetime)

    countdown.start()
}())
