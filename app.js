    const data = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]

    
    // Create Dino Constructor
    function dinosaur(species,weight,height,diet,where,when,fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Objects
    function createDinos() {
        dinos = [];
    
    data.forEach(function (obj,Index) {
       dinos[Index] = new dinosaur(obj.species,obj.weight, obj.height, obj.diet, obj.where, obj.when, obj.fact)
    });
    return dinos;
    }
    

    // Create Human Object
    function createHuman() {
        return human = {
            "name":"Sandeep",
            "height":"6",
            "weight" : "154",
            "diet" :"herbavor"
        }
    
    }
    
    // Use IIFE to get human data from form
    (function () {
        createHuman();
        document.getElementById("btn").addEventListener("click", function () {
            formField = document.getElementById("dino-compare");
            human.name = formField.elements[0].value;
            human.height = parseFloat(formField.elements[1].value+"."+formField.elements[2].value);
            human.weight = parseInt(formField.elements[3].value);
            human.diet = formField.elements[4].value;

            start();
        });

    })();
    

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    dinosaur.prototype.compareHeight = function (humanHeight) {
        
        const howBiggerIsDino = this.height/humanHeight;
        
        return Math.ceil(howBiggerIsDino);
    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    
    dinosaur.prototype.compareWeight = function (humanWeight) {
        
        const howHeavierIsDino = this.weight/humanWeight;
        
        return Math.ceil(howHeavierIsDino);
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    dinosaur.prototype.compareDeit = function (humanDeit) {
        if(this.diet==humanDeit){
            return true
        }
        else{
            return false
        }
    }

    // Generate Tiles for each Dino in Array
     function genrateTiles(dinos) {
         tiles = [];
         dinos.forEach(function (obj,Index) {
            const heightTimes = obj.compareHeight(human.height);
            const weightTimes = obj.compareWeight(human.weight);
            const dietEqual = obj.compareDeit(human.compareDeit);
            const originalFact = obj.fact;
            if(obj.species != 'Pigeon'){
                const factHeight1 = `${obj.species} were ${heightTimes} times bigger than you`;
            const factHeight2 = `you are ${heightTimes} times smaller than ${obj.species}`;
            const factWeight1 = `${obj.species} were ${weightTimes} times heavier than you`;
            const factWeight = `you are ${weightTimes} times lighter than ${obj.species}`;
            const factDiet = (function () {
                if(dietEqual==true){
                    return `Your diet(${obj.diet}) is same as ${obj.species}`
                }else{
                    return `Your diet(${obj.diet}) is different from ${obj.species}`
                }
            })();
            const facts = [originalFact,factHeight1,factHeight2,factWeight,factWeight1,factDiet]
            const selectedFact = Math.floor(Math.random()*facts.length);
            obj.fact = facts[selectedFact];
            }
            
            tiles[Index] = `<h3>${obj.species}<h3><img src='./images/${obj.species.toLowerCase()}.png'><p>${obj.fact}</p>`;
        })
        tiles[8] = tiles[4];
        tiles[4] = `<h3>${human.name}<h3><img src='./images/human.png'>`
        return tiles;


     }
        

        // Add tiles to DOM
        function addToDom(tiles) {
           tiles.forEach(function (tile) {
            var div = document.createElement('div');
            div.setAttribute('class', 'grid-item');
            div.innerHTML = tile;
            document.getElementById('grid').appendChild(div);
           })
        }
        

    // Remove form from screen
        function removeForm() {
            document.getElementById("dino-compare").style.display = "none";
        }
// On button click, prepare and display infographic

        function start(){
            
            dinasuars = createDinos();
            tiles = genrateTiles(dinasuars);
            addToDom(tiles);
            removeForm();
        };
