function F1(qq) {
  this.m_qq = qq;
  this.say = function () {
    return 'Saying ' + this.m_qq;
  }
}

F1.prototype.why = function () {
  return 'Why, oh ' + this.m_qq + '?';
}

F1.crashful = function() {
  return 'What the ' + this.m_qq + '?';
}

let f1 = new F1('Qwerty');

f1.say();
f1.why();

F1.prototype
// F1 { why: [Function] }
f1.prototype
// undefined

Object.getPrototypeOf(f1)
// F1 { why: [Function] }
Object.getPrototypeOf(F1)
// [Function]
Object.getPrototypeOf(f1) === F1.prototype
// true

F1
//  { [Function: F1] what: [Function] }
f1
// F1 { m_qq: 'Qwerty', say: [Function] }

Object.getPrototypeOf(f1).whaaat = function() { return 'Whaaat ' + this.m_qq + '?!'; }
f1.whaaat()
// 'Whaaat Qwerty?!'
F1.prototype
// F1 { why: [Function], whaaat: [Function] }

// Crashes:
f1.crashful();
F1.crashful();

// -------
let F2 = function (qq) {
  this.m_qq = qq;
  this.say = function () {
    return 'Saying ' + this.m_qq;
  }
}

F2.prototype.why = function () {
  return 'Why, oh ' + this.m_qq + '?';
}

F2.prototype === Object.getPrototypeOf(f2)
// true

