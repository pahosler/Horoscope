import '../css/style.css';
import 'font-awesome/css/font-awesome.css';
import 'web-animations-js/web-animations-next.min.js';

//    handle add/remove className (active class for day UI)
const hasClass = (el, className) => {
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
}

const addClass = (el, className) => {
    if (el.classList) {
        el.classList.add(className);
    } else if (!hasClass(el, className)) {
        el.className += " " + className;
    }
}

const removeClass = (el, className) => {
    if (el.classList) {
        el.classList.remove(className);
    } else if (hasClass(el, className)) {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        el.className = el.className.replace(reg, " ");
    }
}

const app = {
    init: function() {
        this.appVars();
        this.cacheDOM();
        this.bindEvents();
    },
    cacheDOM: function() {
        this.wheel = document.getElementById("wheel");
        this.description = document.getElementById("description");
        this.sunSign = document.getElementById("sunSign");
        this.date = document.getElementById("date");
        this.yesterday = document.getElementById("yesterday");
        this.today = document.getElementById("today");
        this.tomorrow = document.getElementById("tomorrow");
        this.capricorn = document.getElementById("capricorn");
        this.aquarius = document.getElementById("aquarius");
        this.pisces = document.getElementById("pisces");
        this.aries = document.getElementById("aries");
        this.taurus = document.getElementById("taurus");
        this.gemini = document.getElementById("gemini");
        this.cancer = document.getElementById("cancer");
        this.leo = document.getElementById("leo");
        this.virgo = document.getElementById("virgo");
        this.libra = document.getElementById("libra");
        this.scorpio = document.getElementById("scorpio");
        this.sagittarius = document.getElementById("sagittarius");
        this.spinner = document.getElementById("spinner");
    },
    appVars: function() {
        this.horoscope = {
            url: "https://horoscope-ph.herokuapp.com/",
            current_date: null,
            date: null,
            sunSign: null,
            color: null,
            description: null,
            lucky_number: null,
            lucky_time: null,
            date_range: null,
            mood: null,
            currentPos: "0deg",
            day: "today",
            wheel: [17, 47, 77, 107, 137, 167, 197, 227, 257, 287, 317, 347],
            sign: [
                "capricorn",
                "aquarius",
                "pisces",
                "aries",
                "taurus",
                "gemini",
                "cancer",
                "leo",
                "virgo",
                "libra",
                "scorpio",
                "sagittarius"
            ]
        };
    },

    //   setters and getters
    setSign: function(sign) {
        this.horoscope.sunSign = sign;
    },
    getSign: function() {
        return this.horoscope.sunSign;
    },
    setDay: function(day) {
        this.horoscope.day = day;
    },
    getDay: function() {
        return this.horoscope.day;
    },
    toggleDay: function(e) {
        removeClass(today, "active");
        removeClass(yesterday, "active");
        removeClass(tomorrow, "active");
        addClass(e, "active")
    },
    toggleSpinner: function() {
        if (hasClass(spinner, "spin-toggle")) {
            removeClass(spinner, "spin-toggle");
        } else {
            addClass(spinner, "spin-toggle");
        }
    },

    bindEvents: function() {
        //     spin wheel events

        this.capricorn.onclick = function() {
            this.setSign(this.horoscope.sign[0]);
            this.moveWheel(this.horoscope.wheel[0], this.getSign());
        }.bind(this);

        this.aquarius.onclick = function() {
            this.setSign(this.horoscope.sign[1]);
            this.moveWheel(this.horoscope.wheel[1], this.getSign());
        }.bind(this);

        this.pisces.onclick = function() {
            this.setSign(this.horoscope.sign[2]);
            this.moveWheel(this.horoscope.wheel[2], this.getSign());
        }.bind(this);

        this.aries.onclick = function() {
            this.setSign(this.horoscope.sign[3]);
            this.moveWheel(this.horoscope.wheel[3], this.getSign());
        }.bind(this);

        this.taurus.onclick = function() {
            this.setSign(this.horoscope.sign[4]);
            this.moveWheel(this.horoscope.wheel[4], this.getSign());
        }.bind(this);

        this.gemini.onclick = function() {
            this.setSign(this.horoscope.sign[5]);
            this.moveWheel(this.horoscope.wheel[5], this.getSign());
        }.bind(this);

        this.cancer.onclick = function() {
            this.setSign(this.horoscope.sign[6]);
            this.moveWheel(this.horoscope.wheel[6], this.getSign());
        }.bind(this);

        this.leo.onclick = function() {
            this.setSign(this.horoscope.sign[7]);
            this.moveWheel(this.horoscope.wheel[7], this.getSign());
        }.bind(this);

        this.virgo.onclick = function() {
            this.setSign(this.horoscope.sign[8]);
            this.moveWheel(this.horoscope.wheel[8], this.getSign());
        }.bind(this);

        this.libra.onclick = function() {
            this.setSign(this.horoscope.sign[9]);
            this.moveWheel(this.horoscope.wheel[9], this.getSign());
        }.bind(this);

        this.scorpio.onclick = function() {
            this.setSign(this.horoscope.sign[10]);
            this.moveWheel(this.horoscope.wheel[10], this.getSign());
        }.bind(this);

        this.sagittarius.onclick = function() {
            this.setSign(this.horoscope.sign[11]);
            this.moveWheel(this.horoscope.wheel[11], this.getSign());
        }.bind(this);

        //     UI day events
        this.yesterday.onclick = (function() {
            this.toggleSpinner();
            this.toggleDay(yesterday);
            this.setDay("yesterday");
            if (this.getSign()) {
                this.getHoroscope();
            }
        }).bind(this);

        this.today.onclick = (function() {
            this.toggleSpinner();
            this.toggleDay(today);
            this.setDay("today");
            if (this.getSign()) {
                this.getHoroscope();
            }
        }).bind(this);

        this.tomorrow.onclick = (function() {
            this.toggleSpinner();
            this.toggleDay(tomorrow);
            this.setDay("tomorrow");
            if (this.getSign()) {
                this.getHoroscope();
            }
        }).bind(this);
    },

    //    spin the wheel
    moveWheel: function(endPos, sign) {
        let wheel = this.wheel;
        let startPos = this.horoscope.currentPos;
        let wheelMoveKeyframes = new KeyframeEffect(
            wheel, [{
                    transform: `rotate(${startPos})`
                },
                {
                    transform: `rotate(${endPos + 1440}deg)`
                }
            ], {
                easing: "ease-in-out",
                duration: 3000,
                fill: "forwards"
            }
        );
        let wheelMoveAnimation = new Animation(
            wheelMoveKeyframes,
            document.timeline
        );
        this.toggleSpinner();
        wheelMoveAnimation.play();
        this.horoscope.currentPos = `${endPos}deg`;
        this.getHoroscope();
    },

    //   get the data
    getHoroscope: function() {
        let sign = this.getSign();
        URL = `${this.horoscope.url}?sign=${sign}&day=${this.getDay()}`;
        fetch(URL, {
                method: "POST"
            })
            .then(response => response.json())
            .then(json => {
                this.horoscope.date = json.current_date;
                this.horoscope.color = json.color;
                this.horoscope.description = json.description;
                this.horoscope.date_range = json.date_range;
                this.sunSign.innerHTML = `${sign} ${this.horoscope.date_range}`;
                this.date.innerHTML = `Your Horoscope for ${this.horoscope.date}`;
                this.description.innerHTML = this.horoscope.description;
                this.toggleSpinner();
            });
    }
};
app.init();
