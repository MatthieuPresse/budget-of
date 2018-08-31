$(function(){

    if(window.data_budget){
        var html= '';
        data_budget.forEach(function(el){
            html = html + `<div class="b">
                    <div class="b-header">
                        <h2 class="b-title">` + el.titre + `</h2>
                        <em class="b-size">Budget: <span>` + el.budget + `</span> ` + el.unit + `</em>
                    </div><!--end b-header-->
                    <div class="b-budget">
                        <div class="b-cat-container">
                            <ul class="b-cat-list">`;

            var sum = 0;
            (data_mesures || []).forEach(function(categorie){
                var odd = false;
                (categorie.list || []).forEach(function(item){
                    sum += item.mesures[el.page][el.type];
                    html = html + `
                        <li class="b-cat b-cat-` + categorie.catname + (odd ? ' odd' : '' )+`">
                            <label for="ads">` + item.name +`</label>
                            <input id="ads" type="text" value="` + item.mesures[el.page][el.type] +`" />
                        </li>`;
                    odd = !odd;
                });
            });

            html = html + `
                            </ul><!--end b-bar-->
                            <em class="actual-size" style="left: ` + (el.budget/sum*100) + `%;">Actual: <span>` + sum + `</span> ` + el.unit + `</em>
                        </div><!--end cat-container-->
                    </div><!--end b-budget-->
                </div><!--end b-->
                `
        });
        document.querySelector('#budgets').innerHTML= html;
    }

    $('.b').each(function(){
        var scope = $(this);
        var actualSize = parseInt(scope.find('.actual-size span').text());

        scope.find('.b-cat input').each(function(){
             var $this = $(this),
                     val = parseInt($this.val());

            var categoryWidth = (val/actualSize)*100;

            $this.parent().width(categoryWidth+'%');
        });

        var inputs = scope.find('.b-cat input'),
                numInputs = inputs.length,
                totalActualSize = 0;


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