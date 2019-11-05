function BankAccount (name, initialDeposit) {
  this.name = name,
  this.balance = parseFloat(initialDeposit)
}

BankAccount.prototype.deposit = function(amount) {
  this.balance += amount;
  return true;
}

BankAccount.prototype.withdrawal = function(amount) {
  if (this.balance >= amount) {
    this.balance -= amount;
    return true;
  }
  alert("You can't withdraw more than you have.");
  return false;
}

BankAccount.prototype.getBalance = function() {
  return this.balance.toFixed(2);
}

function attachListeners() {
  $(".typeOfOperation").change(function() {
    $("#processButton").html($(".typeOfOperation").val())
  })
}

var bankAccount;

$(document).ready(function() {
  attachListeners();

  $("#formOne").submit(function(event) {
    event.preventDefault();
    $("#registerButton").prop('disabled', true);
    $("#processButton").prop('disabled', false);

    var name = $("#nameInput").val();
    var initialDeposit = $("#initialDepositInput").val();
    bankAccount = new BankAccount(name, initialDeposit);
    $("#result").text('$' + bankAccount.getBalance());
  });

  $("#formTwo").submit(function(event) {
    event.preventDefault();
    var amount = parseFloat($("#amountInput").val());
    if (isNaN(amount)) {
      amount = 0;
    }
    var select = $(".typeOfOperation").val();

    if (select === "Deposit") {
      bankAccount.deposit(amount);
    } else if (select === "Withdraw") {
      bankAccount.withdrawal(amount);
    }

    $("#result").text('$' + bankAccount.getBalance());
  })
});
