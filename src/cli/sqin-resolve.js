import nopt from 'nopt';
import resolve from '../resolve';
var config = nopt();

resolve(config.argv.remain, process.stdout);
