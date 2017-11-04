const handleResponse = (response) => {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return response.json().then(json => {
            return Promise.reject(Object.assign({}, json || response.message || response.statusText));
        });
    }
}

const buildUser = (user) => {
    return $('<div />', {
            class: 'list-group-item',
            'data-id': user.id
        })
        .append($('<input/>', {
                class: 'username input-lg',
                disabled: ''
            })
            .val(user.username)
            .add($('<button/>', {
                    class: 'btn btn-success btn-lg update-user-button'
                }).text('save').hide()
                .add($('<button/>', {
                    class: 'btn btn-primary btn-lg edit-cancel-user-button'
                }).text('cancel').hide())
                .add($('<button/>', {
                    class: 'btn btn-primary btn-lg edit-user-button'
                }).text('edit'))
                .add($('<button/>', {
                    class: 'btn btn-danger btn-lg delete-user-button'
                }).text('delete'))
            ));
}

const editUser = (event) => {
    event.preventDefault()

    const $userRow = $(event.target.parentElement);
    const $userName = $userRow.find('.username');

    $userRow.find('.username').prop('disabled', false);
    $userRow.find('.edit-user-button, .delete-user-button').hide();
    $userRow.find('.edit-cancel-user-button, .update-user-button').show();

    $userRow.data('edited-value', $userName.val());
}

const cancelUserEdit = (event) => {
    event.preventDefault()

    const $userRow = $(event.target.parentElement);
    const $userName = $userRow.find('.username');

    $userRow.find('.username').prop('disabled', true);
    $userRow.find('.edit-user-button, .delete-user-button').show();
    $userRow.find('.edit-cancel-user-button, .update-user-button').hide();

    $userName.val($userRow.data('edited-value'));
}