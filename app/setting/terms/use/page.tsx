'use client';

import React from 'react';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';

export default function TermsUse() {
  return (
    <Container
      headerProps={{
        back: true,
        style: {
          position: 'fixed',
          top: 0,
          zIndex: 10,
        },
      }}
      bodyProps={{
        style: {
          backgroundColor: theme.palette.common.white,
          padding: '0 30px 30px 30px',
          alignItems: 'flex-start',
          marginTop: '84px',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '14px',
        }}
      >
        <Typography variant={'h3'}>서비스 이용약관</Typography>
      </div>

      <Typography
        variant={'subtitle2'}
        color={'gray.dark'}
        style={{ marginTop: '24px' }}
      >
        제1조 (목적)
        <br />
        <br />
        본 약관은 원두잇 서비스의 이용과 관련하여 앱과 “이용자”간의 권리, 의무
        및 책임사항, 절차와 기타 필요사항 등을 규정하기 위해 만들어졌습니다.
        <br />
        <br />
        <br />
        제2조 (용어의 정의)
        <br />
        <br />
        본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        <br />
        ① “서비스”란 “이용자”의 단말기(모바일, 태블릿PC 등 각종 유무선 장치를
        포함)를 통하여 제공하는 원두잇 서비스 일체를 의미합니다.
        <br />
        ② “이용자”란 원두잇 서비스를 이용하는 고객 여러분을 의미합니다.
        <br />
        ③ “계정”이란 “이용자”의 식별과 “서비스” 제공을 위하여 앱이 승인하여
        생성되는 계정을을 의미합니다.
        <br />
        <br />
        <br />
        제3조 (약관의 게시와 개정)
        <br />
        <br />
        ① 원두잇은 본 약관을 “이용자”가 쉽게 확인할 수 있도록 원두잇 서비스 내에
        게시합니다.
        <br />
        ② 원두잇은 필요에 따라 “약관의규제에관한법률”,
        “정보통신망이용촉진및정보보호등에관한법률” 등 관련 법령을 위반하지 않는
        범위 내에서 약관을 개정할 수 있습니다.
        <br />
        ③ 약관을 개정하는 경우 개정사항 및 적용일자를 명시하여 적용일 14일
        전까지 “서비스” 내 팝업, 공지사항 등 “이용자”가 인지할 수 있는 방법으로
        공지합니다.
        <br />
        ④ 개정 내용이 “서비스”에 중대하게 영향을 미치는 경우 혹은 부득이하게
        “이용자”에게 불리한 내용인 경우에는 30일 전까지 홈페이지나 “서비스” 내
        팝업, 공지사항 등 “이용자”가 인지할 수 있는 방법으로 공지합니다.
        <br />
        ⑤ 공지일로부터 약관 개정일까지 명시적으로 거부의사를 밝히지 않은
        “이용자”는 개정 약관에 동의한 것으로 간주됩니다.
        <br />
        ⑥ “이용자”는 개정약관에 동의하지 않는 경우 개정약관 적용일부터
        “서비스”를 이용할 수 없으며, 이용계약을 해지할 수 있습니다.
        <br />
        <br />
        <br />
        제4조 (약관의 해석)
        <br />
        <br />
        ① “서비스” 내 개별 “서비스”에 대한 별도 이용약관(이하 “별도약관”) 및
        정책이 존재할 수 있으며, 본 약관과 “별도약관”이 상충하는 경우
        “별도약관”이 우선 적용됩니다.
        <br />
        ② 본 약관 및 “별도약관”에서 정하지 않은 사항이나 해석에 대해서는
        관련법령 또는 상관례를 따릅니다.
        <br />
        <br />
        <br />
        제5조 (서비스 이용계약)
        <br />
        <br />
        ① 본 “서비스”의 이용을 바라는 사람은 조건 없이 이용할 수 있으나 모든
        “서비스” 이용을 위해서는 이용약관 동의 및 가입 절차를 완료해야 합니다.
        <br />
        ② “이용자”는 가입 절차 시 생성되는 ‘회원코드’를 반드시 저장, 보관하여야
        하며, 분실로 인한 피해는 도움 드리지 못합니다.
        <br />
        ③ 원두잇이 수집, 관리하는 개인정보에 대한 내용은 본 약관 17조 및
        [개인정보처리방침]에 있습니다.
        <br />
        ④ 허위 정보를 기재하여 발생하는 모든 불이익 및 법적책임은 이용신청자에게
        있습니다.
        <br />
        ⑥ 이용신청자가 기존에 “서비스” 이용자격을 상실하였거나, 허위 또는 타인의
        정보를 기재하는 경우, 기타 수락이 불가능한 사유가 있는 경우 원두잇은
        가입을 해지할 수 있습니다.
        <br />
        ⑦ “서비스” 이용이 90일간 없는 계정은 비활성화되며, 해당 계정 내 데이터는
        소멸될 수 있습니다.
        <br />
        <br />
        <br />
        제6조 (회원정보 변경 및 이용계약해지)
        <br />
        <br />
        ① “이용자”는 “서비스” 내 메뉴를 통해서 본인의 개인정보를 열람, 수정할 수
        있습니다.
        <br />
        ② 수정 불가한 정보의 수정이 필요한 경우 원두잇에 요청할 수 있습니다.
        <br />
        ③ 정보 미수정으로 인하여 발생하는 불이익에 대해서 원두잇은 책임지지
        않습니다.
        <br />
        ④ “이용자”는 탈퇴기능을 통하여 계정을 삭제할 수 있으며, 이 경우 계정 내
        모든 데이터는 삭제되고 이후 복구가 불가능합니다.
        <br />
        ⑤ 계정 탈퇴 시 모든 “서비스” 데이터는 소멸하나, 휴대폰 번호 및
        이용기록은 “서비스” 이용 혼선 방지, 불법적 사용자 관리 및 수사협조,
        시스템 어뷰징 방지를 위해 1년간 보존 후 폐기되며, 다른 용도로는 사용되지
        않습니다.
        <br />
        <br />
        <br />
        제7조 (계약해지)
        <br />
        <br />
        ① 원두잇은 “이용자”가 다음 각호에 해당하는 경우 통보 없이 “이용자”의
        “서비스” 이용 중지 및 계약 해지(탈퇴) 조치를 취할 수 있습니다.
        <br />
        - 다른 “이용자”의 “서비스” 이용을 방해하거나 그 정보를 도용하는 등
        전자거래질서를 위협하는 경우
        <br />
        - “서비스” 이용 중 법률 위반행위 및 사회의 안녕/질서/미풍양속을 해치는
        행위를 하는 경우
        <br />
        - 원두잇의 애플리케이션 등을 변조 또는 서버를 해킹하는 등의 시스템 위협
        행위를 하는 경우
        <br />
        - 원두잇의 사전승인 및 다른 “이용자”의 동의 없이 Active X, 스파이웨어,
        애드웨어 등의 프로그램을 강제로 설치하는 경우
        <br />
        - 인종/성/광신/이적 등의 반사회적/도덕적 편견에 기반한 단체를 결성하는
        행위를 하는 경우
        <br />
        - 다른 “이용자”의 계정/이메일 등의 개인정보를 수집하는 경우
        <br />
        - 제3자의 특허권, 상표권, 저작권, 영업비밀 등 지적재산권을 포함한 기타
        권리를 침해하는 경우
        <br />
        - “서비스” 이용 중 불법복제 소프트웨어, 제3자의 저작물을 밀매하는 등의
        관련 법률에 저촉되는 경우
        <br />
        - 범죄와의 결부, 관련 법령 위반 활동으로 판단되는 경우
        <br />
        - 본 약관 제16조에 규정된 “이용자”의 의무를 위반한 경우
        <br />
        - 기타 원두잇이 공지한 “서비스” 운영 정책을 위반하거나 통상적으로 비정상
        이용이 확인되는 경우
        <br />
        ② 위 사유에 해당하는 사유로 계약 해지되는 “이용자”의 관련 데이터는 즉시
        소멸되며, “이용자”는 이에 대해 이의제기를 할 수 없습니다. 또한, 위
        사유로 계약해지 되는 경우 재가입, 재이용할 수 없습니다.
        <br />
        ③ 원두잇은 위 사유에 해당하는 “이용자”에게, 그 정도에 따라 계약해지 대신
        이용제한과 및 관련 데이터의 수정 조치를 취할 수 있습니다.
        <br />
        <br />
        <br />
        제8조 (서비스 내용)
        <br />
        <br />
        ① 원두잇이 제공하는 “서비스”의 기본 내용은 다음과 같습니다.
        <br />
        - 컨텐츠 기록 : 이미지, 텍스트 등<br />
        <br />
        <br />
        <br />
        제9조 (서비스 변경)
        <br />
        <br />
        ① 원두잇은 “서비스”를 변경하는 경우 변경 사유와 일자, 내용을 7일전
        공지함을 원칙으로 하며, 부득이하게 사전 공지할 수 없는 경우 사후 공지할
        수 있습니다.
        <br />
        <br />
        <br />
        제10조 (서비스 중단)
        <br />
        <br />
        ① 원두잇은 “서비스” 내용 추가, 삭제, 수정의 이유 또는 관련 설비
        보수점검, 교체 및 고장, 통신두절 등 기술상의 이유로 “서비스” 제공을
        일시적으로 중단할 수 있습니다.
        <br />
        ② “서비스”를 중단하는 경우 사전에 공지함을 원칙으로 하지만, 부득이하게
        사전 공지할 수 없는 경우 사후에 공지할 수 있습니다.
        <br />
        ③ “서비스” 중단은 “이용자”의 앱 내 알림 또는 “서비스” 내 팝업, 공지사항
        등에 게시하는 방법으로 공지합니다.
        <br />
        ④ “서비스” 중단이 발생하여 “이용자”가 손실을 입은 경우 원두잇은 통상적인
        범위 내에서 기타 합당한 데이터 등으로 보상할 수 있습니다. 단, 전쟁,
        천재지변 등 불가항력에 의한 경우에도 보상하지 않으며, 재화의 손실이 아닌
        통상적인 이용불가에 대해서는 보상하지 않습니다.
        <br />
        <br />
        <br />
        제11조 (의무)
        <br />
        <br />
        ① 원두잇은 본 약관 및 관련 법령이 정하는 권리의 행사와 의무의 이행을
        신의에 따라 성실하게 이행합니다.
        <br />
        ② 원두잇은 전쟁, 천재지변, 비상사태, 해결이 곤란한 기술적 결함 등
        부득이한 사유가 없는 한 지체 없이 이를 수리 또는 복구하도록 최선의
        노력을 다하며, 계속적이고 안정적으로 “서비스”를 제공하기 위하여 최선을
        다합니다.
        <br />
        ③ 원두잇은 “이용자”가 안전하게 “서비스”를 이용할 수 있도록
        개인정보보호를 위해 보안시스템을 갖추어야 하며 개인정보취급방침을
        공시하고 준수합니다.
        <br />
        ④ 원두잇은 “서비스” 이용과 관련하여 “이용자”로부터 제기된 의견이나
        불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. “이용자”가
        제기한 의견이나 불만사항은 게시판이나 이메일 등을 통하여 처리결과를
        전달합니다.
        <br />
        <br />
        <br />
        제16조 (이용자의 의무)
        <br />
        <br />
        ① “이용자”는 “서비스” 이용과 관련하여 다음 행위를 하여서는 안 됩니다.
        <br />
        - 부정한 방법으로 휴대폰번호를 생성 또는 도용하여 계정을 생성하는 행위
        <br />
        - “서비스” 이용과 관련된 허위 사실을 유포하는 행위
        <br />
        - “서비스” 내 게시된 각종 정보의 무단 변경, 삭제 등의 훼손 행위
        <br />
        - 다른 “이용자”의 명예훼손 또는 개인정보를 수집하는 행위
        <br />
        - 원두잇 또는 기타 제3자의 저작권 및 지적재산권을 침해하는 행위
        <br />
        - 원두잇의 동의 없는 광고 전송 또는 외설, 폭력적인 정보를 노출하는 행위
        <br />
        - 이외 제7조 1항(““이용자”가 사망한 경우” 제외)에 해당하는 행위 또는
        사회, 도덕적으로 용납되지 않는 행위
        <br />
        <br />
        <br />
        제17조 (개인정보 등의 수집 및 처리)
        <br />
        <br />
        ① 원두잇은 계정(가입) 생성 시 수집된 개인정보(휴대폰번호, 이메일 등)를
        수집해 처리합니다.
        <br />
        ③ 개인정보 수집 및 처리에 대한 기타 상세한 내용은 서비스 내
        “개인정보처리방침”을 통해서 확인할 수 있습니다.
        <br />
        <br />
        <br />
        제18조 (저작권의 귀속 및 이용제한)
        <br />
        <br />
        ① 원두잇의 상표, 로고, 제공 서비스, 광고내용 및 작성한 모든 저작물에
        대한 저작권, 기타 지적재산권은 원두잇에 귀속됩니다.
        <br />
        ② “이용자”는 “서비스”를 이용함으로써 얻은 정보를 원두잇의 사전승낙없이
        복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
        제3자에게 이용하도록 하여서는 안 됩니다.
        <br />
        <br />
        <br />
        제19조 (서비스 관련 분쟁해결)
        <br />
        <br />
        ① 원두잇은 “서비스” 이용과 관련한 “이용자”의 의견이나 불만사항을
        신속하게 처리합니다. 단, 신속한 처리가 곤란한 경우 사유와 처리일정을
        통보합니다.
        <br />
        ② 원두잇과 “이용자”간 발생한 분쟁은 전자거래기본법에 의해 설치된
        전자거래분쟁 조정위원회의 조정절차를 통해 도움을 받을 수 있습니다.
        <br />
        <br />
        <br />
        제20조 (서비스 종료)
        <br />
        <br />
        ① 원두잇은 “서비스”를 종료하고자 하는 날로부터 90일 이전에 본 약관의
        제3조 3항을 통해 “이용자”에게 안내합니다.
        <br />
        ② “서비스” 종료 시시 “이용자”의 모든 데이터는 소멸됩니다. “서비스” 종료
        시점 이후에는 본 “서비스”와 관련된 “이용자”의 권리를 주장하거나 요구할
        수 없습니다.
        <br />
        ③ 종료 안내일로부터 “서비스” 종료일까지 “서비스”의 일부가 제한될 수
        있습니다.
        <br />
        <br />
        <br />
        제21조 (준거법 및 합의관할)
        <br />
        <br />
        ① 본 약관에서 정하지 않은 사항과 본 약관의 해석에 관하여는 대한민국 법
        및 상관례를 따릅니다.
        <br />
        ② “서비스” 및 본 약관과 관련한 제반 분쟁 및 소송은 민사소송법상의
        관할법원 또는 수원지방법원을 관할법원으로 합니다.
        <br />
        <br />
        <br />
        제22조 (개인정보보호의무)
        <br />
        <br />
        원두잇은 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 “이용자”의
        개인정보를 “서비스”가 가능한 최소한의 선에서 수집, 관리하고 있으며,
        “이용자”의 개인정보를 보호하기 위해 최선을 다합니다. 이외 “이용자”의
        개인정보 보호, 파기에 관해서는 관련법령 및 원두잇이 정하는
        "개인정보취급방침"에서 정한 바에 의하며, 회원이 상시 확인할 수 있도록
        서비스 내 공지하고 있습니다.
        <br />
        <br />
        <br />
        제23조 (원두잇 서비스 이용약관 변경에 관한 사항)
        <br />
        <br />① 이 약관은 2023.11.01부터 적용됩니다.
      </Typography>
    </Container>
  );
}
