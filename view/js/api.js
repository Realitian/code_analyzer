const baseUrl = 'https://turing.com/api/customers'

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
    },

    postEmail: function(email) {
        console.log('email', email)
        let data = { email: email }
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

    postProject: function(project) {
        console.log('project', project)
        let data = { project: project }
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

    postRemote: function(remote) {
        console.log('remote', remote)
        let data = { remote_open: remote }
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

    postSoon: function(soon) {
        console.log('soon', soon)
        let data = { how_soon: soon }
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

    postDeveloperType: function(skill) {
        console.log('dev_type', skill)
        let data = { dev_type: skill }
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

    postReach: function(contact) {
        console.log('contact', contact)
        let data = {
            email: contact.email,
            phone_number: contact.phonenumber,
            skype_id: contact.skype
        }
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

    postJob: function(job) {
        console.log('job', job)
        let data = {
            job_url: job.jobUrl,
            description: job.jobDescription
        }
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

    postTeam: function(team) {
        console.log('team', team)
        let data = { team_members: team }
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

    postStage: function(stage) {
        console.log('stage', stage)
        let data = { company_stage: stage }
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
