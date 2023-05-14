var buttons = document.querySelectorAll('.expand-button');

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    var div = this.parentNode.parentNode.nextSibling.nextSibling;
    var btn = this.firstChild;
    console.log(this.firstChild);
    if (div.style.display === 'table-row') {
      div.style.display = 'none';
      btn.classList.replace('fa-minus', 'fa-plus')
    } else {
        div.style.display = 'table-row';
        btn.classList.replace('fa-plus', 'fa-minus')
    }
    
  });
});
