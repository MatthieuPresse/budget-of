$(function(){

    $('.b').each(function(){
        var scope = $(this);

        scope.find('.b-cat input').each(function(){
             var $this = $(this),
                     val = parseInt($this.val());

            var actualSize = parseInt(scope.find('.actual-size span').text());
            console.log(actualSize);
            var categoryWidth = (val/actualSize)*100;

            $this.parent().width(categoryWidth+'%');
        });

        var inputs = scope.find('.b-cat input'),
                numInputs = inputs.length,
                totalActualSize = 0;

        //Calculate total value from each category
        inputs.each(function(){
             var val = parseInt($(this).val());
             totalActualSize = totalActualSize + val;

             $(this).val('' + val/10 + '%');
        });

        actualSize = totalActualSize;
        scope.find('.actual-size span').text(totalActualSize);

        var budgetSize = parseInt(scope.find('.b-size span').text());
        var actualSize = parseInt(scope.find('.actual-size span').text());
        var totalSize = actualSize/budgetSize;

        //If actual val is over budget
        if(totalSize>1) {
            scope.find('.b-header, .actual-size').addClass('has-error');
         scope.find('.b-cat-container').width('100%');
        } else {
            scope.find('.b-header, .actual-size').removeClass('has-error');
            scope.find('.b-cat-container').width(totalSize*100+'%');
        }

    })

});