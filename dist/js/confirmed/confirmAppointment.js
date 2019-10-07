/**
 * Created by 89561 on 2019/10/4.
 */
function chooseTime( self ){
    var _self = self;
    if(_self.picker) {
        _self.picker.show(function (rs) {
            $( _self ).val( rs.text )
        });
    } else {
        var optionsJson = _self.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
            $( _self ).val( rs.text )
            console.log( rs.text )
        });
    }
}