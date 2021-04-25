import React, { useContext } from 'react';
import * as FXes from '../../../FxConstants';
import { FxContext } from '../../../context/FxContext';

import GlitterElement from './FxElems/GlitterElement';
import EnergyBallElement from './FxElems/EnergyBallElement';
import ExplosionElement from './FxElems/ExplosionElement';
import LaserElement from './FxElems/LaserElement';
import SpellElement from './FxElems/SpellElement';
import SwordElement from './FxElems/SwordElement';

const ActiveFx = () => {
  const { activeFx } = useContext(FxContext);
  let returnElement = null;

  switch (activeFx) {
    case FXes.GLITTER:
      returnElement = <GlitterElement />;
      break;

    case FXes.ENERGY_BALL:
      returnElement = <EnergyBallElement />;
      break;

    case FXes.EXPLOSION:
      returnElement = <ExplosionElement />;
      break;

    case FXes.LASER:
      returnElement = <LaserElement />;
      break;

    case FXes.SPELL:
      returnElement = <SpellElement />;
      break;

    case FXes.SWORD:
      returnElement = <SwordElement />;
      break;

    default:
      returnElement = null;
  }
  return returnElement;
};

export default ActiveFx;
