import dashboard from './visualyzer'
import api from './api';

let isIOS = false
let repo_url = ''
let debug = true
var dataSet = []

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

function showTable(data) {
    dataSet = data
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
            // showTag($('#dashboard'))
            showTag($('.datatable'))
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

            repo_url = $(this).val()
            if (repo_url.length < 1) return

            api.register(repo_url)

            hideInput()
            showSubmit()
        }
    })
    $('#label-name').on('click', function(e) {
        repo_url = $('#name').val()
        if (repo_url.length < 1) return

        api.register(repo_url)

        hideInput()
        showSubmit()
    })
}

var table = null
function makeProcessing() {
    table = $('#table-processing').DataTable({
        data: dataSet,
        columns: [
            { title: "No" },
            { title: "Name" },
            { title: "Completed" }
        ]
      });

    //   var table = $('#table-processing').DataTable();

    var table1 = $('#table-langs').DataTable({
        data: [],
        columns: [
            { title: "Language" },
            { title: "File Size" },
            { title: "Line Count" }
        ],
        bPaginate: false,
        info: false,
        searching: false,
        order: [[ 2, "desc" ]]
      });

      $('#table-processing tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();

        var detail = JSON.parse(data[3])
        if ( 'data' in detail ) {
            var langs = detail.data[0].rows
            console.log(langs)

            // table1.data = langs
            table1.clear()
            table1.rows.add(langs)
            table1.draw()
    
            // var header = [
            //     'Language', 'Line Count', 'Percent'
            // ]
    
            // dashboard.update(header, langs)
        }        
      } );

      refresh()
}

function refresh() {
    api.list(showTable)

    table.clear()
    table.rows.add(dataSet)
    table.draw()

    setTimeout(function() {
        refresh()
    }, 1000)
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
    
    // var header = [
    //     'Language', 'Line Count', 'Percent'
    // ]

    // var tF = [
    //     ["Markdown", 6628, 216],
    //     ["JavaScript", 12631, 489],
    //     ["TypeScript", 3631, 129],
    //     ["YAML", 94, 7],
    //     ["JSON", 2864, 104],
    //     ["HTML", 341, 12]
    // ]
    
    // dashboard.load('#dashboard', header, tF);
})