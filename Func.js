String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Math.logB = function(x,y){
    return (Math.log(y) / Math.log(x));
}



class Func{
    constructor(funcString){
        this.string = funcString;
        this.expression = this.string;
    }

    getString(){
        return this.string;
    }

    getExpression(){
        return this.expression;
    }

    setString(funcString){
        this.string = funcString;
        this.expression = this.string;
    }

    prep(){
        this.expression = this.expression.replaceAll("sin", "Math.sin");
        this.expression = this.expression.replaceAll("cos", "Math.cos");
        this.expression = this.expression.replaceAll("tan", "Math.tan");
        this.expression = this.expression.replaceAll("asin", "Math.asin");
        this.expression = this.expression.replaceAll("acos", "Math.acos");
        this.expression = this.expression.replaceAll("atan", "Math.atan");
        this.expression = this.expression.replaceAll("pi", "Math.PI");

        this.expression = this.expression.replaceAll("ln", "Math.log");
        this.expression = this.expression.replaceAll("log", "Math.logB");
        this.expression = this.expression.replaceAll("e","Math.E");
        this.expression = this.expression.replaceAll("pow", "Math.pow");

    }

    eval(scope){

        var evalString = this.expression.replaceAll("x", scope.x);

        return eval(evalString);
    }
}
