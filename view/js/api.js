const baseUrl = 'https://code.turing.services/api/'

const api = {
    register: function(repo_url) {
        let data = { repo_url: repo_url }
        $.ajax({
            type: 'GET',
            url: baseUrl + 'register',
            dataType: 'JSON',
            data: data,
            success: function(data) {
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    },

    list: function(showTable) {
        $.ajax({
            type: 'GET',
            url: baseUrl + 'list',
            dataType: 'JSON',
            success: function(data) {
                showTable(data)
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    },

    listUrl: function() {
        return baseUrl + 'list'
    },

    lang: function(repo_url, showTable) {
        let data = { repo_url: repo_url }
        $.ajax({
            type: 'GET',
            url: baseUrl + 'lang',
            dataType: 'JSON',
            data: data,
            success: function(data) {
                showTable(data)
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    },

    package: function(language, showTable) {
        let data = { lang: language }
        $.ajax({
            type: 'GET',
            url: baseUrl + 'packages',
            dataType: 'JSON',
            data: data,
            success: function(data) {
                showTable(data)
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    },

    reposPackage: function(language, url, showTable) {
        let data = { lang: language, url: url }
        $.ajax({
            type: 'GET',
            url: baseUrl + 'repopackages',
            dataType: 'JSON',
            data: data,
            success: function(data) {
                showTable(data)
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    }
}

export default api
