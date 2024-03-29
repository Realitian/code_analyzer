import dashboard from './visualyzer'
import api from './api';

let isIOS = false
let repo_url = ''

var langTable = $('#table-langs').DataTable({
    columns: [
        { title: "Language" },
        { title: "File Size" },
        { title: "Line Count" }
    ],
    bPaginate: false,
    info: false,
    searching: false,
    order: [[ 2, "desc" ]],
    pageLength: 100
});

var packageTable = $('#table-package').DataTable({
    columns: [
        { title: "Name" },
        { title: "Used Count" },
    ],
    bPaginate: true,
    info: false,
    searching: true,
    order: [[ 1, "desc" ]],
    pageLength: 100
});


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
    tag.css('display', 'block')
}

function hideTag(tag) {
    tag.removeClass('show').addClass('hide')
    tag.css('display', 'none')
}

function showMain() {
    setTimeout(function() {
        $('main').addClass('show')
        $('#turing-logo').addClass('show')
        $('.step-container')
            .first()
            .find('.animate')
            .addClass('show')

        showTag(
            $('.step-container')
                .eq(1)
                .find('.animate')
        )
        showTag(
            $('.step-container')
                .eq(2)
                .find('.animate')
        )
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
    $('#lang-container').css('display', 'none')
    $('#package-list-container').css('display', 'none')

    setTimeout(function() {
        showTag(
            $('.step-container')
                .eq(2)
                .find('.animate')
        )

        setTimeout(function() {
            showTag($('#list-processing'))
        }, 1000)
    }, 2000)
}

function createListTable() {
    let url = api.listUrl()

    var table = $('#table-processing').DataTable({
        columns: [
            { title: "No", data: 'id' },
            { title: "Name", data: 'url' },
            { title: "Completed", data: 'percent' }
        ],
        order: [[ 0, "desc" ]],
        ajax: url,
        pageLength: 100
    });

    setInterval(function(){
        let isList = window.location.href.includes('#list')
        if (isList) {
            // console.log('table ajax reloading', table)
            table.ajax.reload(null, false);
        }
    }, 5000);
    
    $('#table-processing tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        window.location.href = "#lang?url=" + data.url
    } );

    $('#table-langs tbody').on('click', 'tr', function () {
        let url = window.location.href.substring(window.location.href.indexOf('url=')+4)
        let lang = this.firstChild.innerHTML
        if ( lang == 'JavaScript' || lang == 'Python' || lang == 'Java' )
            window.location.href = "#url?lang=" + lang + "&url=" + url
    } );
}

function showLangTable(data) {
    var detail = data.data[0]

    langTable.clear()
    langTable.rows.add(detail.rows)
    langTable.draw()

    console.log( detail.rows.length == 0 )
    if( detail.rows.length == 0 ) {
        showTag($('#empty-reason'))
    } else {
        hideTag($('#empty-reason'))
    }
}

function showLang(query) {
    $('#input-container').css('display', 'none')
    $('#thanks-container').css('display', 'none')
    $('#list-container').css('display', 'none')
    $('#lang-container').css('display', 'block')
    $('#package-list-container').css('display', 'none')

    showTag(
        $('.step-container')
            .eq(3)
            .find('.animate')
    )

    let url = query.replace('url=', '')
    $('#github-url').text( url )
    api.lang(url, showLangTable)
    
    setTimeout(function() {
        showTag($('#lang-stats'))
    }, 1000)
}

function showPackageTable(data) {
    packageTable.clear()
    packageTable.rows.add(data)
    packageTable.draw()
}

function showPackage(lang) {
    let title = 'Overall ' + lang[0].toUpperCase() + lang.substring(1) + ' Package Usage'
    $('#lang-package').text( title )

    $('#input-container').css('display', 'none')
    $('#thanks-container').css('display', 'none')
    $('#list-container').css('display', 'none')
    $('#lang-container').css('display', 'none')
    $('#package-list-container').css('display', 'block')

    showTag(
        $('.step-container')
            .eq(4)
            .find('.animate')
    )

    api.package(lang, showPackageTable)
    
    setTimeout(function() {
        showTag($('#package-list'))
    }, 1000)
}

function showRepoPackage(params) {
    params = params.split('&')
    let lang = params[0].substring(params[0].indexOf('=')+1)
    let url = params[1].substring(params[1].indexOf('=')+1)
    window.console.log(lang, url)

    let title = lang[0].toUpperCase() + lang.substring(1) + ' Package Usage Of ' + url
    $('#lang-package').text( title )

    $('#input-container').css('display', 'none')
    $('#thanks-container').css('display', 'none')
    $('#list-container').css('display', 'none')
    $('#lang-container').css('display', 'none')
    $('#package-list-container').css('display', 'block')

    showTag(
        $('.step-container')
            .eq(4)
            .find('.animate')
    )

    api.reposPackage(lang, url, showPackageTable)
    
    setTimeout(function() {
        showTag($('#package-list'))
    }, 1000)
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

let router = new Navigo('/', true, '#')
router.on({
    list: () => {
        showList()
    },
    lang: (param, query) => {
        showLang(query)
    },
    package: (param, lang) => {
        showPackage(lang)
    },
    url:(param, params) => {
        showRepoPackage(params)
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
    createListTable()
})