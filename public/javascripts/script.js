$(document).ready( function() {
  
           /* Event listeners */
  $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
    $('#fileName').val(label);
  });
  
  $('.btn-file :file').change(function() {
    var input = $(this),
        numFiles,
        label;
        
    numFiles = this.files ? this.files.length : 1;
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });
});