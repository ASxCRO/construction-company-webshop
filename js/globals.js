function GetModal(sHref) {
    try {
            $('.ui.modal')
            .modal('show').load(sHref)
          ;

    } catch (error) {
      alert('error');
    }
  }