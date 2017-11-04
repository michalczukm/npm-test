'use strict';

(() => {
  const $usersList = $('#users-list');
  let users = [
    { id: 1, username: 'Jan' },
    { id: 2, username: 'Piotr' },
    { id: 3, username: 'Adam' },
    { id: 4, username: 'Maria' },
    { id: 5, username: 'Kasia' },
  ];

  // 1. GET USERS ========================================================================
  const getUsers = () => {
    $usersList.empty();
    users.map(u => buildUser(u).appendTo($usersList));
  }

  // 2. ADD USERS ========================================================================
  const addUser = (event) => {
    event.preventDefault();

    let $newItem = $('#username');
    let username = $newItem.val();

    if (!username) {
      // its empty - we don't want to save that
      return;
    }

    $newItem.val('');

    users.push({
      id: Math.max(...users.map(u => u.id))+1,
      username: username
    });
    
    toastr.success('Item created', 'Success!');
    getUsers();
  }

  // 3.DELETE USERS ========================================================================
  const deleteUser = (event) => {
    event.preventDefault();

    const id = $(event.target.parentElement).data('id');

    users = users.filter(u => u.id != id);
    toastr.success('Item deleted', 'Success!');
    getUsers();
  }

  // 4.UPDATE USERS ========================================================================
  const updateUser = (event) => {
    event.preventDefault();
    const $userRow = $(event.target.parentElement);

    // please use this method on successful request
    const useItOnSuccess = () => $userRow.find('.edit-user-button, .delete-user-button').show();

    const id = $userRow.data('id');
    const username = $userRow.find('.username').val();

    const postBody = {
      username: username
    };

    users.find(u => u.id == id).username = username;

    toastr.success('Item deleted', 'Success!');
    getUsers();
  }

  // ========================== NOT INTERESTING AREA ========================== NOT INTERESTING AREA ========================== NOT INTERESTING AREA ==========================
  // ========================== NOT INTERESTING AREA ========================== NOT INTERESTING AREA ========================== NOT INTERESTING AREA ==========================
  // ========================== NOT INTERESTING AREA ========================== NOT INTERESTING AREA ========================== NOT INTERESTING AREA ==========================

  $(() => {
    getUsers();

    $('#add-user-button').click((event) => addUser(event));
    $('body').on('click', '.delete-user-button', (event) => deleteUser(event));
    $('body').on('click', '.edit-user-button', (event) => editUser(event));
    $('body').on('click', '.edit-cancel-user-button', (event) => cancelUserEdit(event));
    $('body').on('click', '.update-user-button', (event) => updateUser(event));
  })
})();
