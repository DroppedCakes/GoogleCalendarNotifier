function getMembers() {
  var members = ["Alice", "Bob"];
  // GoogleCalendarIdを設定する
  var calendarIds = {
    Alice: "xxxx@gmail.com",
    Bob: "xxxx@gmail.com",
  };

  var MembersInfo = [];

  members.forEach(function (member) {
    var calendarId = calendarIds[member];
    var myCalendar = CalendarApp.getCalendarById(calendarId);

    var startDate = new Date();
    var myEvents = myCalendar.getEventsForDay(startDate);
    var titletime = "【" + member + "】" + "\n";

    myEvents.forEach(function (myEvent) {
      var title = myEvent.getTitle();
      var startTime = myEvent.getStartTime();
      var endTime = myEvent.getEndTime();

      startTime = Utilities.formatDate(startTime, "JST", "hh:mm");
      endTime = Utilities.formatDate(endTime, "JST", "hh:mm");

      titletime +=
        "・" +
        "[予定] : " +
        title +
        " [時間] : " +
        startTime +
        " - " +
        endTime +
        "\n";
    });

    titletime += "-----------------------------" + "\n";
    MembersInfo.push(titletime);
  });
  return MembersInfo;
}

function notifySlack() {
  var calMembers = getMembers();
  var today = new Date().toLocaleDateString("ja");
  var text = "の予定です\n";
  calMembers.forEach(function (calMember) {
    text += calMember + "\n";
  });
  var payload = {
    username: "今日の予定",
    text: today + text,
    channel: "今日の予定",
  };
  var options = {
    method: "post",
    "content-type": "application/json",
    payload: JSON.stringify(payload),
  };
  var url = "https://hooks.slack.com/services/XXXXXXXXXXXXXXXXXX";
  UrlFetchApp.fetch(url, options);
}
