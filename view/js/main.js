import api from './api'

let isIOS = false
let name = ''
let debug = true

const screen_desktop = 1024
const screen_standard = 976
const screen_mobile = 640

let log = string => {
    if (debug) console.log(string)
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
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

function showMain() {
    setTimeout(function() {
        $('main').addClass('show')
        $('#turing-logo').addClass('show')
        $('.step-container')
            .first()
            .find('.animate')
            .addClass('show')
    }, 500)
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

// Name Page
function hideName() {
    $('#name').blur()
    hideTag(
        $('.step-container')
            .first()
            .find('.animate')
    )
    $('#label-name').removeClass('show')
    $('#avatar-label').html(name.charAt(0).toUpperCase())

    hideTag($('.avatar'))
    hideTag($('#name'))

    setTimeout(() => {
        $('.step-container')
            .first()
            .addClass('totop')
        $('#name').addClass('totop')
        $('#name').prop('disabled', true)
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
function showName() {
    
    setTimeout(() => {
        showTag(
            $('.step-container')
                .first()
                .find('.animate')
        )
    }, 1500)
    hideTag($('.avatar'))
    if (($('.avatar').hasClass('step2') || $('.avatar').hasClass('step3'))) {
        setTimeout(() => {
        
        }, 500)
    }
    
    $('.avatar, #name-container').removeClass('step2')

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
function nameProc(callback, route) {
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

                callback(name)
                router.navigate(route)
            }
        }
    })
    $('#label-name').on('click', function(e) {
        name = $('#name').val()
        if (name.length < 1) return

        callback(name)
        router.navigate(route)
    })
}

// Company Page
function hideCompany() {
    console.log('hideCompany')
    $('#company').blur()
    $('.step-container')
        .eq(1)
        .find('.animate')
        .addClass('hide')
    $('.avatar, #name-container').addClass('step2')
    $('#label-company').removeClass('show')

    setTimeout(() => {
        $('.step-container')
            .eq(1)
            .addClass('totop')
        $('#company').prop('disabled', true)
        $('#company').addClass('totop')
        $('label-company').addClass('gone')
        $('.step-container')
            .eq(1)
            .find('.animate')
            .addClass('gone')
        setTimeout(() => {
            $('.step-container')
                .eq(1)
                .find('.animate')
                .css('display', 'none')
        }, 1200)
    }, 1000)
}
function showCompany() {
    console.log('showCompany')

    setTimeout(function() {
        showTag($('.avatar'))
    }, 500)

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
            showTag($('#name'))
            $('#company').prop('disabled', false)
            showTag($('#company'))
            showCursor('#company')
        }, 100)
    }, 2000)
}
function companyProc(callback, route) {
    $('#company').on('keydown', function(e) {
        if (!$(this).hasClass('totop')) {
            $('#label-company')
                .addClass('show')
                .find('.to-split-word-horizontal')
                .addClass('show')
            $('#label-company-arrow').addClass('show')

            if (e.which == 13) {
                e.preventDefault()

                let company = $(this).val()

                if (company.length < 1) return

                callback(company)
                router.navigate(route)
            }
        }
    })
    $('#label-company').on('click', function(e) {
        name = $('#company').val()
        if (name.length < 1) return

        callback(name)
        router.navigate(route)
    })
}
// Email Page
function hideEmail() {
    hideTag($('#email'))
    $('#email').blur()
    hideTag(
        $('.step-container')
            .eq(2)
            .find('.animate')
    )
    $('#label-email').addClass('gone')
}
function showEmail() {
    setTimeout(function() {
        $('.step-container')
            .eq(2)
            .css('display', 'block')
        setTimeout(() => {
            showTag(
                $('.step-container')
                    .eq(2)
                    .find('.animate')
            )
            showTag($('#email'))
        }, 100)
    }, 2000)

    setTimeout(function() {
        showCursor('#email')
    }, 2700)
}

function emailProc(callback, route) {

    function processEmail(email) {
        if (!validateEmail(email)) {
            toggleShowEmailValidation(true)
            return
        }

        toggleShowEmailValidation(false)

        callback(email)
        router.navigate(route)
    }

    $('#email').on('keydown', function(e) {
        if (!$('#email').hasClass('totop')) {
            $('#label-email')
                .addClass('show')
                .find('.to-split-word-horizontal')
                .addClass('show')
            $('#label-email-arrow').addClass('show')

            if ((e.which == 13)) {
                e.preventDefault()

                let needs = $(this).val()

                if (needs.length < 1) return

                processEmail(needs)
                
            }            
        }
    })
    $('#label-email').on('click', function(e) {
        let email = $('#email').val()
        if (email.length < 1) return

        processEmail(email)
    })
}
function toggleShowEmailValidation(show) {
    if (show) {
        $('#notifier').removeClass('hide')
        $('#notifier').addClass('show')
    } else {
        $('#notifier').removeClass('show')
        $('#notifier').addClass('hide')
    }
}

// Project Page
function hideProject() {
    console.log('hideProject')

    hideTag($('#question-project .animate'))
    setTimeout(function() {
        hideTag($('#question-project'))
    }, 200)
}
function showProject() {
    $('#company, .avatar, #name-container, #company-container').addClass(
        'step3'
    )
    updateCompanyNamePosition()
    setTimeout(function() {
        $('#email-container').css('display', 'none')
        $('#name-container').css('display', 'none')
        setTimeout(function() {
            $('.step-top').addClass('shrink')
            $('#question-project').css('display', 'block')
            setTimeout(() => {
                showTag($('#question-project'))
                showTag($('#question-project .animate'))
            }, 100)
        }, 500)
    }, 2000)
}

function projectProc(callback, route) {
    $('#question-project .answers-single-item').on('click', function() {
        $(this).addClass('active')
        callback($(this).attr('val'))
        router.navigate(route)
    })
}

// Remote Page
function hideRemote() {
    hideTag($('#question-remote .animate'))
    setTimeout(function() {
        hideTag($('#question-remote'))
    }, 200)
}
function showRemote() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-project').css('display', 'none')
        $('#question-remote').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-remote'))
            showTag($('#question-remote .animate'))
        }, 100)
    }, 2000)
}
function remoteProc(callback, route) {
    $('#question-remote .answers-single-item').on('click', function() {
        $(this).addClass('active')

        callback($(this).attr('val'))
        router.navigate(route)
    })
}

// Soon Page
function showSoon() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-remote').css('display', 'none')
        $('#question-soon').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-soon'))
            showTag($('#question-soon .animate'))
        }, 100)
    }, 2000)
}
function hideSoon() {
    hideTag($('#question-soon .animate'))
    setTimeout(function() {
        hideTag($('#question-soon'))
    }, 200)
}

function soonProc(callback, route) {
    $('#question-soon .answers-single-item').on('click', function() {
        $(this).addClass('active')

        callback($(this).attr('val'))
        router.navigate(route)
    })
}
// Skill Page
function hideSkill() {
    hideTag($('#question-skill .animate'))

    setTimeout(function() {
        hideTag($('#confirm'))
        hideTag($('#question-skill'))
    }, 200)
}
function showSkill() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-soon').css('display', 'none')
        $('#question-skill').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-skill'))
            showTag($('#question-skill .animate'))
        }, 100)
    }, 2000)

    setTimeout(function() {
        $('#filter').focus()
    }, 3000)
}
function skillProc(callback, route) {
    // $('#filter').on('keydown', function() {
    //     $(this).next().find('.answers-item').each(function() {
    //         $(this).html('<span>' + $(this).text() + '</span>')
    //     })
    // })

    // $('#filter').on('keyup', function() {
    //     $(this).next().find('.answers-item').removeClass('filtered')

    //     var val = $(this).val().toLowerCase()

    //     if(val != '') {
    //         $(this).next().find('.answers-item').each(function() {
    //             if ($(this).text().toLowerCase().indexOf(val) < 0) {
    //                 $(this).addClass('filtered')
    //             } else {
    //                 var text = $(this).text()
    //                 var start = $(this).text().toLowerCase().indexOf(val)
    //                 var end = val.length

    //                 $(this).html('<span>' + text.substring(0, start) + '<strong>' + text.substr(start, end) + '</strong>' + text.substring(start + val.length, text.length) + '</span>')
    //             }
    //         })
    //     }
    // })

    $('#filter').on('keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault()

            let custom = $(this).val()
            if (custom.length < 1) return
            // Add new item
            $(this).val('')
            let item =
                '<div class=\'answers-item added\'><span>' +
                custom +
                '</span></div>'
            $('#skill-answers').prepend(item)
            setTimeout(function() {
                $('#skill-answers .answers-item')
                    .eq(0)
                    .removeClass('added')
                    .addClass('adding')
                setTimeout(() => {
                    $('#skill-answers .answers-item')
                        .eq(0)
                        .removeClass('adding')
                }, 1200)
            }, 600)
        }
    })

    let vals = new Set()

    $(document).on('click', '#skill-answers .answers-item', function() {
        $(this).toggleClass('active')

        if ($(this).hasClass('active')) {
            // vals.add( $(this).attr('val') )
            vals.add(
                $(this)
                    .find($('span'))
                    .text()
            )
        }

        if ($('#skill-answers .answers-item.active').length) {
            showTag($('#confirm'))
        } else {
            hideTag($('#confirm'))
        }
    })

    $('#confirm').on('click', function() {
        callback(Array.from(vals))
        router.navigate(route)
    })
}

// Contact Page
function hideReach() {
    $('body').removeClass('fit')
    hideTag($('#question-reach'))
    if ($(window).width() > screen_standard) {
        setTimeout(function() {
            hideTag($('#reach-left-bk'))

            setTimeout(function() {
                hideTag($('#reach-left .animate'))

                setTimeout(function() {
                    hideTag($('#reach-right'))
                    $('#reach-left-bk').removeClass('shrink')

                    setTimeout(function() {
                        hideTag($('#reach-right').find('.body'))
                    }, 1000)
                }, 1500)
            }, 1500)
        }, 500)
    } else {
        setTimeout(function() {
            hideTag($('#reach-right'))

            setTimeout(function() {
                hideTag($('#reach-right').find('.body'))
            }, 1000)
        }, 500)
    }
}
function showReach() {
    $('body').addClass('fit')
    showTag($('#question-reach'))
    $('.step-top').addClass('shrink')

    $('#question-reach').css('display', 'block')
    $('#question-skill').css('display', 'none')

    if ($(window).width() > 976) {
        setTimeout(function() {
            showTag($('#reach-left-bk'))

            setTimeout(function() {
                showTag($('#reach-left .animate'))

                setTimeout(function() {
                    showTag($('#reach-right'))
                    $('#reach-left-bk').addClass('shrink')

                    setTimeout(function() {
                        showTag($('#reach-right').find('.body'))
                    }, 1000)
                }, 1500)
            }, 1500)
        }, 500)
    } else {
        setTimeout(function() {
            showTag($('#reach-right'))

            setTimeout(function() {
                showTag($('#reach-right').find('.body'))
            }, 1000)
        }, 500)
    }
}
function reachProc(callback, route) {
    $('#signup-normal').on('click', function() {
        // let email = $('.email').val()
        let skype = $('#skype').val()
        let phonenumber = $('#phonenumber').val()

        // $('.email').removeClass('invalid')
        $('#skype').removeClass('invalid')
        $('#phonenumber').removeClass('invalid')

        let invalid = false
        // if (email.length < 1) {
        //     $('.email').addClass('invalid')
        //     invalid = true
        // }

        // if (skype.length < 1) {
        //     $('#skype').addClass('invalid')
        //     invalid = true
        // }

        if (phonenumber.length < 1) {
            $('#phonenumber').addClass('invalid')
            invalid = true
        }

        // if ( !validateEmail(email) ) {
        //     $('.email').addClass('invalid')
        //     invalid = true
        // }

        if (invalid) return

        callback({ skype, phonenumber })
        router.navigate(route)
    })
}
// Job Page (removed!!!)
function hideJob() {
    hideTag($('#question-job .animate'))
    hideTag($('#job-url'))
    hideTag($('#job-description'))

    setTimeout(function() {
        hideTag($('#submit'))
    }, 200)
}
function showJob() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-reach').css('display', 'none')
        $('#question-job').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-job'))
            showTag($('#question-job .animate'))
        }, 100)
    }, 2000)

    setTimeout(function() {
        showTag($('#job-url'))
    }, 1600)

    setTimeout(function() {
        $('#job-url').focus()
    }, 2000)
}
function jobProc(callback, route) {
    $('#job-url').on('keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault()

            $(this).addClass('small')
            $('#job-description').addClass('show')

            setTimeout(function() {
                $('#job-description').focus()
            }, 500)
        }
    })

    $('#job-description').on('keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault()

            $(this).addClass('small')
            $('#submit').addClass('show')
            $('#job-description').blur()
        }
    })

    $('#submit').on('click', function() {
        let jobUrl = $('#job-url').val()
        let jobDescription = $('#job-description').val()

        callback({ jobUrl, jobDescription })
        router.navigate(route)
    })
}

// Team Page
function showTeam() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-job').css('display', 'none')
        $('#question-team').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-team'))
            showTag($('#question-team .animate'))
        }, 100)
    }, 2000)
}

function hideTeam() {
    hideTag($('#question-team .animate'))

    setTimeout(function() {
        hideTag($('#question-team'))
    }, 200)
}
function teamProc(callback, route) {
    $('#question-team .answers-single-item').on('click', function() {
        $(this).addClass('active')
        callback($(this).attr('val'))
        router.navigate(route)
    })
}
// Stage Page
function hideStage() {
    hideTag($('#question-stage .animate'))
    setTimeout(function() {
        hideTag($('#question-stage'))
    }, 200)
}
function showStage() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-team').css('display', 'none')
        $('#question-stage').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-stage'))
            showTag($('#question-stage .animate'))
        }, 100)
    }, 2000)
}
function stageProc(callback, route) {
    $('#question-stage .answers-single-item').on('click', function() {
        callback($(this).attr('val'))
        $(this).addClass('active')
        router.navigate(route)
    })
}
// Thanks Page
function showThanks() {
    $('.step-top').addClass('shrink')

    setTimeout(function() {
        $('#question-stage').css('display', 'none')
        $('#question-thanks').css('display', 'block')
        setTimeout(() => {
            showTag($('#question-thanks'))
            showTag($('#question-thanks .animate'))
        }, 100)
    }, 2000)
}

function hideThanks() {
    hideTag($('#question-thanks'))
    hideTag($('#question-thanks .animate'))
}

function hideCurrent() {
    if (currentRoute === '') return

    log('hide: ' + currentRoute)

    if (currentRoute === routeName) hideName()
    if (currentRoute === routeCompany) hideCompany()
    if (currentRoute === routeEmail) hideEmail()
    if (currentRoute === routeProject) hideProject()
    if (currentRoute === routeRemote) hideRemote()
    if (currentRoute === routeSoon) hideSoon()
    if (currentRoute === routeSkill) hideSkill()
    if (currentRoute === routeContact) hideReach()
    // if (currentRoute === routeJob)
    //     hideJob()
    if (currentRoute === routeTeam) hideTeam()
    if (currentRoute === routeStage) hideStage()
    if (currentRoute === routeThanks) hideThanks()
}
function setFullView(full) {
    if (full) {
        if (!$('.step').hasClass('full')) $('.step').addClass('full')
        if (!$('body').hasClass('fit')) $('body').addClass('fit')
    } else {
        if ($('.step').hasClass('full')) $('.step').removeClass('full')
        if ($('body').hasClass('fit')) $('body').removeClass('fit')
    }
}
function showNext(nextRoute) {

    if (currentRoute === '' && nextRoute != '' && nextRoute != 'name') {
        currentRoute = 'name'
    }
    hideCurrent()
    prevRoute = currentRoute
    if (nextRoute === routeName) {
        setFullView(false)
        showName()        
        currentRoute = routeName
    } else if (nextRoute === routeCompany) {
        showCompany()
        currentRoute = routeCompany
    } else if (nextRoute === routeEmail) {
        showEmail()
        currentRoute = routeEmail
    } else if (nextRoute === routeProject) {
        showProject()
        currentRoute = routeProject
    } else if (nextRoute === routeRemote) {
        showRemote()
        currentRoute = routeRemote
    } else if (nextRoute === routeSoon) {
        showSoon()
        currentRoute = routeSoon
    } else if (nextRoute === routeSkill) {
        showSkill()
        currentRoute = routeSkill
    } else if (nextRoute === routeContact) {
        showReach()
        currentRoute = routeContact
    }
    // else if (nextRoute === routeJob) {
    //     showJob()
    //     currentRoute = routeJob
    // }
    else if (nextRoute === routeTeam) {
        showTeam()
        currentRoute = routeTeam
    } else if (nextRoute === routeStage) {
        showStage()
        currentRoute = routeStage
    } else if (nextRoute === routeThanks) {
        setFullView(true)
        showThanks()
        currentRoute = routeThanks
    }
}

const routeName = 'name'
const routeCompany = 'company'
const routeEmail = 'email'
const routeProject = 'project'
const routeRemote = 'remote'
const routeSoon = 'soon'
const routeSkill = 'skill'
const routeContact = 'contact'
// const routeJob = 'job'
const routeTeam = 'team'
const routeStage = 'stage'
const routeThanks = 'thanks'

const routes = ['name', 'company', 'email', 'project', 'remote', 'soon', 'skill', 'contact', 'team', 'stage', 'thanks']
let currentRoute = ''
let prevRoute = ''

function isBack() {
    if (currentRoute === prevRoute) return false

    let currentIndex = routes.indexOf(currentRoute)
    let prevIndex = routes.indexOf(prevRoute)

    if (currentIndex >= prevIndex) return false

    return true
}

let router = new Navigo('/', true, '#')
router.on({
    name: () => {
        console.log('route-name')
        showNext(routeName)
    },
    company: () => {
        console.log('route-company')
        showNext(routeCompany)
    },
    email: () => {
        console.log('route-email')
        showNext(routeEmail)
    },
    project: () => {
        console.log('route-project')
        showNext(routeProject)
    },
    remote: () => {
        console.log('route-remote')
        showNext(routeRemote)
    },
    soon: () => {
        console.log('route-soon')
        showNext(routeSoon)
    },
    skill: () => {
        console.log('route-skill')
        showNext(routeSkill)
    },
    contact: () => {
        console.log('route-contact')
        showNext(routeContact)
    },
    // 'job': () => {
    //     console.log('route-job')
    //     showNext(routeJob)
    // },

    team: () => {
        console.log('route-team')
        showNext(routeTeam)
    },
    stage: () => {
        console.log('route-stage')
        showNext(routeStage)
    },
    thanks: () => {
        console.log('route-thanks')
        showNext(routeThanks)
    },
    '': () => {
        console.log('route-empty')
        showNext(routeName)
    }
})

// set the default route
router.on(() => {
    log('route root')
    showNext(routeName)
})
// set the 404 route
router.notFound(query => {})

router.resolve()

$(document).ready(function() {
    // Scrollbar.init(document.body, {
    //     damping: 0.04
    // })

    var md = new MobileDetect(window.navigator.userAgent)
    isIOS = md.os() === 'iOS'

    readyStringAnimation()

    showMain()

    nameProc(api.postName, routeCompany)
    companyProc(api.postCompany, routeEmail)
    emailProc(api.postEmail, routeProject)
    projectProc(api.postProject, routeRemote)
    remoteProc(api.postRemote, routeSoon)
    soonProc(api.postSoon, routeSkill)
    skillProc(api.postDeveloperType, routeContact)
    reachProc(api.postReach, routeTeam)
    // jobProc(api.postJob, routeTeam)
    teamProc(api.postTeam, routeStage)
    stageProc(api.postStage, routeThanks)
})

$(window).resize(function() {
    // let vh = $(window).height * 0.01
    // document.documentElement.style.setProperty('--vh', `${vh}px`)

    updateCompanyNamePosition()
})

function updateCompanyNamePosition() {
    $('#company-name-ruler').text($('#company').val())

    // var canvas = document.createElement('canvas')
    // var context = canvas.getContext('2d')
    let margin = 100
    if ($(window).width() <= screen_mobile) {
        // context.font = '1.6rem Gordita'
        margin = 80
    }
    // context.font = '1.4rem Gordita'

    // var metrics = context.measureText($('#company').val())
    // console.log(metrics.width)
    var companyElem = document.getElementById('company')
    // let width = metrics.width
    let width = $('#company-name-ruler').width()
    if (width >= 200) width = 200
    let right = width / 2 + margin // 100 = 10rem

    companyElem.style.setProperty('--right-space', right + 'px')
}
