const baseUrl = 'http://192.168.1.115/api/'

const api = {
    postName: function(name) {
        console.log('name', name)
        let data = { full_name: name }
        $.ajax({
            type: 'POST',
            url: baseUrl,
            dataType: 'JSON',
            data: { data: data },
            xhrFields: { withCredentials: true },
            success: function(data) {
                console.log(data)
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    },

    postCompany: function(company_name) {
        console.log('name', company_name)
        let data = { company_name: company_name }
        $.ajax({
            type: 'POST',
            url: baseUrl,
            dataType: 'JSON',
            data: { data: data },
            xhrFields: { withCredentials: true },
            success: function(data) {
                console.log(data)
            },
            error: function(xhr, status, error) {
                console.log(status)
                console.log(error)
            }
        })
    }
}

export default api
