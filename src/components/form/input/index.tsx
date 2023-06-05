import { Typography } from '@components/typography';

import { Label, GenderButton, GenderRadioButton, Input } from '../style';

export const Nickname = ({
  nickname,
  onChange,
  onBlur,
}: {
  nickname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="nickname">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        나의 이름
      </Typography>
    </Label>
    <Input
      type="text"
      id="nickname"
      name="nickname"
      placeholder="성을 제외하고 이름만 적어주세요!"
      value={nickname}
      onChange={e => {
        if (!/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]*$/.test(e.target.value)) {
          return;
        }
        onChange(e);
      }}
      onBlur={onBlur}
      maxLength={16}
    />
  </>
);

export const Gender = ({
  gender,
  onChange,
}: {
  gender: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="gender">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        나의 성별(선택)
      </Typography>
    </Label>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}
    >
      <GenderButton selected={gender === 'male'}>
        <GenderRadioButton
          type="radio"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={onChange}
        />
        <Typography
          variant={'label2'}
          color={gender === 'male' ? 'common.white' : 'gray.main'}
        >
          남자
        </Typography>
      </GenderButton>
      <GenderButton selected={gender === 'female'}>
        <GenderRadioButton
          type="radio"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={onChange}
        />
        <Typography
          variant={'label2'}
          color={gender === 'female' ? 'common.white' : 'gray.main'}
        >
          여자
        </Typography>
      </GenderButton>
    </div>
  </>
);

export const Birthday = ({
  birthday,
  onChange,
}: {
  birthday: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="birthday">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        내가 태어난날(선택)
      </Typography>
    </Label>
    <Input
      type="birthday"
      id="birthday"
      name="birthday"
      placeholder="6자리로 입력해주세요! 예) 961024"
      value={birthday}
      onChange={onChange}
      maxLength={6}
    />
  </>
);
