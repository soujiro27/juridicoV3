const $ = require('jquery')
var menu = function loadMenu () {
  var nUsr = localStorage.getItem('nUsr')
  var nCampana = localStorage.getItem('nCampana')
  if (nUsr !== '' && nCampana !== '') {
    var sPanel = ''
    var nRenglon = 0
    var nTotal = 0
    var dato
    $.ajax({
      type: 'GET',
      url: '/lstModulosByUsuarioCampana/' + nCampana,
      success: function (response) {
        var jsonData = JSON.parse(response)
        nTotal = jsonData.datos.length
        for (var i = 0; i < nTotal; i++) {
          dato = jsonData.datos[i]
          sPanel = dato.panel
          document.getElementById(sPanel).style.display = 'block'
          sPanel = sPanel + '-UL'
          var ul = document.getElementById(sPanel)
          var li = document.createElement('li')
          var ancla = document.createElement('a')
          ancla.setAttribute('href', dato.liga)
          var icono = document.createElement('li')
          icono.setAttribute('class', dato.icono)
          ancla.appendChild(icono)
          var texto = document.createTextNode(' ' + dato.nombre)
          ancla.appendChild(texto)
          nRenglon = nRenglon + 1
          li.appendChild(ancla)
          ul.appendChild(li)
        }
      },
      error: function (xhr, textStatus, error) {
        console.log('ERROR: En function cargarMenu(nCampana)  ->  statusText: ' + xhr.statusText + ' TextStatus: ' + textStatus + ' Error:' + error)
      }
    })
  } else {
    if (nCampana === '') console.log('Debe establecer una CUENTA PÚBLICA como PREDETERMINADA. Por favor consulte con su administrador del sistema.')
  }
  $('.has_sub > a').click(function (e) {
    e.preventDefault()
    var menuLi = $(this).parent('li')
    var menuUl = $(this).next('ul')

    if (menuLi.hasClass('open')) {
      menuUl.slideUp(350)
      menuLi.removeClass('open')
    }
    else {
      $('#nav > li > ul').slideUp(350)
      $('#nav > li').removeClass('open')
      menuUl.slideDown(350)
      menuLi.addClass('open')
    }
  })
}
module.exports = menu
