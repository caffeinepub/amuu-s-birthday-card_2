import Text "mo:core/Text";

actor {
  var birthdayMessage = "Happy Birthday!";
  var recipientName = "Friend";

  public shared ({ caller }) func setBirthdayMessage(message : Text, name : Text) : async () {
    birthdayMessage := message;
    recipientName := name;
  };

  public query ({ caller }) func getBirthdayCard() : async {
    message : Text;
    name : Text;
  } {
    { message = birthdayMessage; name = recipientName };
  };
};
