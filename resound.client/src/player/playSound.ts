import * as Tone from "tone";

interface baseUrlProps {
  url: string;
  filename: string;
}
interface volumeProps {
  volume: number;
}
interface pannerProps {
  pan: number;
}
var buffer = new Tone.Buffer();

export let sampler: Tone.Sampler = new Tone.Sampler();
function newsampler(newurl: string, newfile: string) {
  sampler = new Tone.Sampler({
    urls: {
      C4: newfile,
    },
    release: 1,
    baseUrl: newurl,
  }).toDestination();
}
function newsamplervolume(volume: number) {
  sampler.volume.value = volume;
}
function newsamplerpan(pan: number) {
  const panner = new Tone.PanVol(pan, pan).toDestination();
  sampler.chain(panner);
}
export const BaseUrl: React.FC<baseUrlProps> = ({ url, filename }) => {
  const urlbase = { url }.url;
  const filenamebase = { filename }.filename;
  buffer = new Tone.Buffer(urlbase + filenamebase);

  newsampler(urlbase, filenamebase);

  return null;
};
export const VolumeValue: React.FC<volumeProps> = ({ volume }) => {
  newsamplervolume({ volume }.volume);
  return null;
};
export const PanValue: React.FC<pannerProps> = ({ pan }) => {
  newsamplerpan({ pan }.pan);
  return null;
};
