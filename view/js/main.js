import dashboard from './visualyzer'

let isIOS = false
let name = ''
let debug = true

const screen_desktop = 1024
const screen_standard = 976
const screen_mobile = 640

let log = string => {
    if (debug) console.log(string)
}

function readyStringAnimation() {
    $('.to-split').each(function(index) {
        var characters = $(this)
            .text()
            .split('')

        let $this = $(this)
        $this.empty()
        $.each(characters, function(i, el) {
            $this.append('<span>' + el + '</span>')
        })
    })

    $('.to-split-word').each(function(index) {
        var words = $(this)
            .text()
            .split(' ')

        let $this = $(this)
        $this.empty()
        $.each(words, function(i, el) {
            $this.append('<span>' + el + '</span> ')
        })
    })

    $('.to-split-word-horizontal').each(function(index) {
        var words = $(this)
            .text()
            .split(' ')

        let $this = $(this)
        $this.empty()
        $.each(words, function(i, el) {
            $this.append('<span>' + el + '</span> ')
        })
    })
}


function showCursor(tag) {
    $(tag).focus()

    if (isIOS) {
        let pos = $(tag).offset()
        let width = $(tag).width()
        let height = $(tag).height()

        let c_w = $('#custom_cursor').width()
        let c_h = $('#custom_cursor').height()

        let top = pos.top + height / 2 - c_h / 2
        // let left = pos.left + width/2 + 10
        $('#custom_cursor').offset({ top: top })
        // $('#custom_cursor').offset({top:top, left:left})
        $('#custom_cursor').removeClass('hide')
        $('#custom_cursor').addClass('show')

        $(document).on('click touchstart', function() {
            $('#custom_cursor').removeClass('show')
            $('#custom_cursor').addClass('hide')
        })
    }
}

function showTag(tag) {
    tag.removeClass('hide').addClass('show')
}

function hideTag(tag) {
    tag.removeClass('show').addClass('hide')
}

function showMain() {
    setTimeout(function() {
        $('main').addClass('show')
        $('#turing-logo').addClass('show')
        $('.step-container')
            .first()
            .find('.animate')
            .addClass('show')
    }, 500)
    
    showInput()
}

function showInput() {
    setTimeout(() => {
        showTag(
            $('.step-container')
                .first()
                .find('.animate')
        )
    }, 1500)
    
    setTimeout(() => {
        $('#input-container')
            .find('.animate')
            .removeClass('hide')
        $('#input-container')
            .find('.animate')
            .removeClass('gone')
        $('#input-container')
            .find('.animate')
            .css('display', 'block')
        $('#label-name').removeClass('gone')
    }, 1500)

    setTimeout(function() {
        $('#name').prop('disabled', false)
        showTag($('#name'))
        showCursor('#name')
    }, 1500)
}

function hideInput() {
    $('#name').blur()
    hideTag(
        $('.step-container')
            .first()
            .find('.animate')
    )
    $('#label-name').removeClass('show')

    hideTag($('#name'))

    setTimeout(() => {
        $('.step-container')
            .first()
            .find('.animate')
            .addClass('gone')
        $('#label-name').addClass('gone')
        $('#input-container').css('display', 'none')
    }, 2000)
}


function showSubmit() {
    setTimeout(function() {
        setTimeout(() => {
            $('#thanks-container').css('display', 'block')

            showTag(
                $('.step-container')
                    .eq(1)
                    .find('.animate')
            )
            $('.step-container')
                .eq(1)
                .find('.animate')
                .removeClass('gone')
                
            $('#label-thanks')
                .addClass('show')
                .find('.to-split-word-horizontal')
                .addClass('show')
            $('#label-thanks-arrow').addClass('show')

        }, 100)
    }, 2000)
}

function hideSubmit() {
    hideTag($('#company'))
}

function showList() {
    $('#input-container').css('display', 'none')
    $('#thanks-container').css('display', 'none')
    $('#list-container').css('display', 'block')
    
    setTimeout(function() {
        showTag(
            $('.step-container')
                .eq(2)
                .find('.animate')
        )

        setTimeout(function() {
            showTag($('#dashboard'))
        }, 1000)
    }, 2000)
}

function inputProc() {
    $('#name').on('keydown', function(e) {
        $('#label-name')
            .addClass('show')
            .find('.to-split-word-horizontal')
            .addClass('show')
        $('#label-name-arrow').addClass('show')

        if (e.which == 13) {
            e.preventDefault()

            name = $(this).val()
            if (name.length < 1) return

            hideInput()
            showSubmit()
        }
    })
    $('#label-name').on('click', function(e) {
        name = $('#name').val()
        if (name.length < 1) return

        hideInput()
        showSubmit()
    })
}

const routeList = 'list'

let currentRoute = ''

let router = new Navigo('/', true, '#')
router.on({
    list: () => {
        showList()
    },
    '': () => {
        showMain()
    }
})

// set the default route
router.on(() => {
    showMain()
})
// set the 404 route
router.notFound(query => {})

router.resolve()

$(document).ready(function() {
    var md = new MobileDetect(window.navigator.userAgent)
    isIOS = md.os() === 'iOS'

    readyStringAnimation()

    showMain()
    
    inputProc()
    
    var freqData=[
        {State:'AL',freq:{low:4786, mid:1319, high:249}}
        ,{State:'AZ',freq:{low:1101, mid:412, high:674}}
        ,{State:'CT',freq:{low:932, mid:2149, high:418}}
        ,{State:'DE',freq:{low:832, mid:1152, high:1862}}
        ,{State:'FL',freq:{low:4481, mid:3304, high:948}}
        ,{State:'GA',freq:{low:1619, mid:167, high:1063}}
        ,{State:'IA',freq:{low:1819, mid:247, high:1203}}
        ,{State:'IL',freq:{low:4498, mid:3852, high:942}}
        ,{State:'IN',freq:{low:797, mid:1849, high:1534}}
        ,{State:'KS',freq:{low:162, mid:379, high:471}}
        ];
    
    dashboard('#dashboard',freqData);
})