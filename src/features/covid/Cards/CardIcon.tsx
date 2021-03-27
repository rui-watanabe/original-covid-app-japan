import React from 'react';
import { MdLocalHospital } from 'react-icons/md';
import { GiHastyGrave, GiGraveFlowers } from 'react-icons/gi';
import { FcInspection } from 'react-icons/fc';
import { BiBed } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';

type CardIconProps = {
  categoryKey: string;
};

const CardIcon = ({ categoryKey }: CardIconProps): JSX.Element => {
  if (categoryKey === 'positive-cases') {
    return <MdLocalHospital />;
  }
  if (categoryKey === 'severe-cases') {
    return <GiGraveFlowers />;
  }
  if (categoryKey === 'death-cases') {
    return <GiHastyGrave />;
  }
  if (categoryKey === 'recovery-cases') {
    return <AiFillLike />;
  }
  if (categoryKey === 'hospitalization-cases') {
    return <BiBed />;
  }
  if (categoryKey === 'test-cases') {
    return <FcInspection />;
  }
  return <></>;
};
export default CardIcon;
