import visualizer from './visualyzer'

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
    
    $('#name').prop('disabled', false)
    showTag($('#name'))

    setTimeout(() => {
        $('.step-container')
            .first()
            .removeClass('totop')
        $('#name').removeClass('totop')
        $('#name-container')
            .find('.animate')
            .removeClass('hide')
        $('#name-container')
            .find('.animate')
            .removeClass('gone')
        $('#name-container')
            .find('.animate')
            .css('display', 'block')
        $('#label-name').removeClass('gone')
    }, 1500)

    setTimeout(function() {
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
        setTimeout(() => {
            $('.step-container')
                .first()
                .find('.animate')
                .css('display', 'none')
        }, 1200)
        $('#label-name').addClass('gone')
    }, 2000)
}


function showSubmit() {
    console.log('showCompany')

    setTimeout(function() {
        $('#company-container').css('display', 'block')
        $('.step-container')
            .eq(1)
            .css('display', 'block')

        $('.step-container')
            .eq(1)
            .removeClass('totop')
        $('#company').removeClass('totop')

        setTimeout(() => {
            $('.step-container')
                .eq(1)
                .find('.animate')
                .css('display', 'block')
            showTag(
                $('.step-container')
                    .eq(1)
                    .find('.animate')
            )
            $('.step-container')
                .eq(1)
                .find('.animate')
                .removeClass('gone')
            $('#company').prop('disabled', false)
            showTag($('#company'))
            showCursor('#company')
        }, 100)
    }, 2000)
}

function hideSubmit() {
    hideTag($('#company'))
}

function showList() {
    hideInput()
    hideSubmit()

}

function inputProc() {
    $('#name').on('keydown', function(e) {
        if (!$(this).hasClass('totop')) {
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
        }
    })
    $('#label-name').on('click', function(e) {
        name = $('#name').val()
        if (name.length < 1) return

        hideInput()
        showSubmit()
    })

    showInput()
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
    
    visualizer()
})