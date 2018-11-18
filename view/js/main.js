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
    // tag.css('display', 'block')
}

function hideTag(tag) {
    tag.removeClass('show').addClass('hide')
    // tag.css('display', 'none')
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
            showTag($('#list'))
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

function makeProcessing() {
    var dataSet = [
        ['1', 'tensorflow/tensorflow', '84%'],
        ['2', 'd3/d3', '54%'],
        ['3', 'tensorflow', '24%'],
        ['4', 'd3', '64%'],
        ['5', 'asg', '89%'],
        ['6', 'tensorflow/tensorflow', '84%'],
        ['7', 'd3/d3', '54%'],
        ['8', 'tensorflow', '24%'],
        ['9', 'd3', '64%'],
        ['10', 'asg', '89%'],
        ['11', 'tensorflow/tensorflow', '84%'],
        ['12', 'd3/d3', '54%'],
        ['13', 'tensorflow', '24%'],
        ['14', 'd3', '64%'],
        ['15', 'asg', '89%'],
        ['16', 'tensorflow/tensorflow', '84%'],
        ['17', 'd3/d3', '54%'],
        ['18', 'tensorflow', '24%'],
        ['19', 'd3', '64%'],
        ['20', 'asg', '89%'],
        ['21', 'tensorflow/tensorflow', '84%'],
        ['22', 'd3/d3', '54%'],
        ['23', 'tensorflow', '24%'],
        ['24', 'd3', '64%'],
        ['25', 'asg', '89%'],
    ]

    $('#datatable').DataTable({
        data: dataSet,
        columns: [
            { title: "No" },
            { title: "Name" },
            { title: "Completed" }
        ]
      });

      var table = $('#datatable').DataTable();

      $('#datatable tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        // alert( 'You clicked on '+data[0]+'\'s row' );

        var tF = [
            {type: "low", freq: 513},
            {type: "mid", freq: 62346},
            {type: "high", freq: 234},
        ]

        dashboard.update(tF)
      } );
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

    makeProcessing()
    
    var tF = [
        {type: "low", freq: 21027},
        {type: "mid", freq: 14830},
        {type: "high", freq: 9364},
    ]
    
    dashboard.load('#dashboard',tF);
})