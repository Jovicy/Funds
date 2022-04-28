
var getlooser = new getLooser;

function getLooser() {
    this.applicant = [];

    this.init = function() {
        this.addApplicants();
        this.getRandomUser();
        this.runAgain();
        this.startOver();
    }

    this.showList = function() {
        var parent = document.querySelector('.applicant_list_wrapper');
        var template = '';

        for (var i = 0; i < this.applicant.length; i++) {
            template += '<span class="name-tag" data-id="'+i+'">'+this.applicant[i]+'</span>'
        }

        parent.innerHTML = '';
        parent.insertAdjacentHTML('afterbegin',template);
        this.deleteOne();
    }

    this.addApplicants = function() {
        var $this = this;
        function generateList(input) {
            var value = input.value;

            if($this.checkValid(value.toLowerCase())) {
                $this.applicant.push(value.toLowerCase());
                input.value = '';
                $this.showList()

            } else {
                alert('Something is wrong')
            }
        }

        var addBtn = document.querySelector('#add_applicant');

        addBtn.addEventListener('click', function(){
            var input = document.querySelector('#applicant_value');
            generateList(input)
        })
    }

    this.checkValid = function(value) {
        if(this.applicant.indexOf(value) < 0 && value != '') {
            return true
        }
        return false;
    }

    this.getRandomUser = function() {
        var $this = this;
        var resultButton = document.querySelector('#show_results');

        function showLooser() {
            var resultsContainer = document.querySelector('.results_container');
            var applicantsContainer = document.querySelector('.applicant_container');

            applicantsContainer.className += ' hidden';
            resultsContainer.className = 'results_container';

            $this.showRandomUsers();

        }

        resultButton.addEventListener('click', function(e){
            if ($this.applicant.length > 1) {
                showLooser();
            } else {
                alert('You need more Users')
            }
        })
    }

    this.showRandomUsers = function() {
        var resultsContainer = document.querySelector('.result');
        var rand = this.applicant[Math.floor(Math.random() * this.applicant.length)];

        resultsContainer.innerHTML = '';
        resultsContainer.insertAdjacentHTML('afterbegin', '<h3>'+rand+'</h3>')
    }

    this.runAgain = function() {
        var $this = this;
        var runAgainBtn = document.querySelector('.run_again');

        runAgainBtn.addEventListener('click', function(e){
            $this.showRandomUsers();
        })
    }

    this.startOver = function() {
        var $this = this;
        var startOverBtn = document.querySelector('.start_again');

        startOverBtn.addEventListener('click', function(e){
            var resultContainer = document.querySelector('.results_container');
            var applicantContainer = document.querySelector('.applicant_container');
            var applicantWrapper = document.querySelector('.applicant_list_wrapper');

            resultContainer.className = 'results_container hidden';
            applicantContainer.className = 'applicant_container';
            applicantWrapper.innerHTML = '';

            $this.applicant = [];
        })
    }


    this.deleteOne = function() {
        var $this = this;
        var item = document.querySelectorAll('.name-tag');

        function removeIt(element) {
            var attr = parseInt(element.getAttribute('data-id'));
            $this.applicant.splice(attr, 1);
            $this.showList();
        }

        for (var i = 0; i < item.length; i++) {
            item[i].addEventListener('click', function(e){
                removeIt(this)
            })       
        }
    }

}

getlooser.init();