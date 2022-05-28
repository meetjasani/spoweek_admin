export type Role = "USER" | "ADMIN";

enum Sports {
    Football = "축구",
    Basketball = "농구",
    Baseball = "야구",
    Volley_Ball = "배구",
    Marathon = "마라톤 ",
    Bike = "자전거",
    Swimming = "수영",
    Golf = " 골프",
    Tennis = " 테니스",
    Badminton = " 배드민턴 ",
    Table_Tennis = "탁구",
    Bowling = " 볼링",
    Billiards = "당구",
    Hado = " 하도",
    other = " 기타추가",
}

enum Recruitment_method {
    atSpoweek = "스포위크에서 모집",
    From_outside = "외부에서 모집"
}

enum Price_policy {
    Free = "무료",
    With_fee = "유료"
}
enum Restriction_on_participation {
    notRestricted = "제한없음",
    Restricted = "제한있음"
}
enum Recruitment_Division {
    Individual = "개인",
    Group = "단체",
    From_outside = "외부에서 모집"
}
enum Location {
    Offline = "오프라인",
    Online = "온라인"
}
enum Approve_Participants {
    Auto = "자동",
    Manual = "수동"
}
enum Awaiter_Receipt {
    Yes = "사용",
    no = "사용 안 함"
}
enum Participant_Info {
    Name = "Name",
    EmailAddress = "EmailAddress",
    MobileNo = "MobileNo",
    DateOfBirth = "DateOfBirth",
    Gender = "Gender",
    Affiliation = "Affiliation",
    Address = "Address",
    File = "File"
}

enum Gender {
    Male = "남성",
    Female = "여성"
}
enum Participate_Status {
    Confirmed = "참가확정",
    Waiting = "참가대기"
}
enum Attendance {
    Attended = "출석",
    Absent = "미출석"
}
enum Vaccination {
    Vaccinated = "접종",
    Unvaccinated = "백신을 접종하지 않은"
}
enum Covid_Symptoms {
    No = "해당 없음",
    Yes = "사용"
}

enum DynamicControlField {
    static = "Static",
    other = "Other",
}
export {
    Sports,
    Recruitment_method,
    Price_policy,
    Restriction_on_participation,
    Recruitment_Division,
    Location,
    Approve_Participants,
    Awaiter_Receipt,
    Participant_Info,
    Gender,
    Participate_Status,
    Attendance,
    Vaccination,
    Covid_Symptoms,
    DynamicControlField
};


