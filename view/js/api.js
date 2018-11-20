const baseUrl = 'http://192.168.1.115:5000/api/'

const api = {
    register: function(repo_url) {
        let data = { repo_url: repo_url }
        $.ajax({
            type: 'GET',
            url: baseUrl + 'register',
            dataType: 'JSON',
            data: data,
            success: function(data) {
                console.log(data)
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
                console.log(data)
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
