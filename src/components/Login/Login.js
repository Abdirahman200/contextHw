import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (prevstate, action) => {
  if(action.type === "USER_INPUT"){
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if(action.type === "INPUT_BLUR"){
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    }
  }
  return{
    value: "",
    isValid: false,
  }
}

const passwordReducer = (prevstate, action) => {
  if(action.type === "USER_INPUT"){
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    }
  }
  if(action.type === "INPUT_BLUR"){
    return {
      value: action.value,
      isValid: action.value.trim() > 6,
    }
  }
  return{
    value: "",
    isValid: false,
  }
}

const Login = (props) => { 
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  })
  // const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false); 




  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('VALID');
      setFormIsValid(emailState.isValid && passwordState.isValid)
    }, 2500);

    return () => {
      console.log("clean up");
      clearTimeout(identifier)
    }
  }, [emailState, passwordState])




  const emailChangeHandler = (event) => { //Это emailChangeHandler булар input тун ичинде OnChange={} менен чакырылат 
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value }) //Бул жерде ошолордун value син алып туруп enteredEmail дын ичине сактап жатабыз
  };

  const passwordChangeHandler = (event) => { //Это passwordChangeHandler тоже самое passwordChangeHandler менен иштетекенде setFormIsValid сакырылса 
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
  };

  const validateEmailHandler = () => { //Бул функция кторый вот кайра ле ошол setEmailIsValid ди чакырып жатат 
    dispatchEmail({type: "USER_BLUR"}); //Если собачкасы бар болсо значить email valid true калйтарып койот проста 
  };

  const validatePasswordHandler = () => { // Бул функция болсо 
    dispatchPassword({type: "INPUT_BLUR"}); //Пароль ду trim() кылып lebgth ны проверка кылып 6 > дан  жогору болсо бул деле true кайтарып койот
  };

  const submitHandler = (event) => { //Бул жерде ошол жана setFormIsValid useState(true) эмнеге сактап койот десек бул жерде submit кылгында
    event.preventDefault(); //Мы потом можем проверить форма толтурулдубу же толтурулбадыбы
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : '' //Бул жерде div ке className бергенбиз classes.control алып жатат жана emailIsValid биздн false болуп калса анда classes.invalid ди берип кой деп жатабыз 
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}//OnBlur метод емес event бул true и false алат смотря true,false то есть М: input тун ичи пустой бирок четтери кызыл болуп турат как будто ошибка ичине бирдеке жазсак ал жоголуп кетет это onBlur бул жоголбойт пока биз туура жазмайынча 
          />
        </div>
        <div
          className={`${classes.control} ${ //Бул жерде div ке className бергенбиз classes.control алып жатат жана passwordIsValid биздн false болуп калса анда classes.invalid ди берип кой деп жатабыз 
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}//OnBlur метод емес event бул true и false алат смотря true,false то есть М: input тун ичи пустой бирок четтери кызыл болуп турат как будто ошибка ичине бирдеке жазсак ал жоголуп кетет это onBlur бул жоголбойт пока биз туура жазмайынча 
          />
        </div>
        <div className={classes.actions}>
          {/*  бул жакта кнопкабызда да disabled деген функциясы бар он будеть true в том случе если formIsValid польностю true болгондо */}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login 
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;


//Паобочные еффекты ето всё что происходитьт кроме етих вещей М: HTTP жонотууб хранить что-то в хранилще бразера.LocalStroge , settmeout, setinterval это всё SideEffect
