function GetModal(sHref,selector) {
    try {
      switch(selector) {
        case "showDocumentArticles":
          $('#artikliOdabranogDokumenta')
          .modal('show').load(sHref)
        ;
          break;
        case "modalEditArticle":
          alert('ulaz artikli edit');
          $('#modalEditArticle')
          .modal({
            closable  : false,
            onDeny    : function(){
              $(this).modal('hide');
              return false;
            },
            onApprove : function() {
              scope.editArticle($('#ime-artikla-hidden').val(), $('#ime-artikla').val(), $('#cijena-artikla'.val()));
              $(this).modal('hide');

            }
          })
          .modal('show').load(sHref)
        ;
          break;
        default:
          break;
      
      }
    } catch (error) {
      alert('error');
    }
  }
