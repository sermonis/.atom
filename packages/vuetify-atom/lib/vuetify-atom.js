'use babel';

import VuetifyAtomView from './vuetify-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  vuetifyAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vuetifyAtomView = new VuetifyAtomView(state.vuetifyAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vuetifyAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vuetify-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vuetifyAtomView.destroy();
  },

  serialize() {
    return {
      vuetifyAtomViewState: this.vuetifyAtomView.serialize()
    };
  },

  toggle() {
    console.log('VuetifyAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
