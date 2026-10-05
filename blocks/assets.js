/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

goog.provide("Blockly.Blocks.assets");

goog.require("Blockly.Blocks");
goog.require("Blockly.Colours");
goog.require("Blockly.constants");
goog.require("Blockly.ScratchBlocks.Extensions");

const getWorkspaceVM = function (workspace) {
  while (workspace) {
    if (workspace.options && workspace.options.vm) {
      return workspace.options.vm;
    }
    workspace = workspace.options && workspace.options.parentWorkspace;
  }
  return null;
};

const getAssetMenuOptions = function (field) {
  const block = field.sourceBlock_;
  const workspace = block && block.workspace;
  const vm = getWorkspaceVM(workspace);
  const target = vm && vm.editingTarget;
  const targetId = target && target.sprite && target.sprite.clones.length ?
    target.sprite.clones[0].id : target && target.id;
  const assets = vm && vm.runtime.extensionStorage.assets || [];
  const options = assets
    .filter(function (asset) {
      return !asset.scopeId || asset.scopeId === targetId;
    })
    .map(function (asset) {
      return [asset.name, asset.name];
    });
  return options.length ? options : [["", ""]];
};

Blockly.Blocks["assets_menu"] = {
  /**
   * Assets drop-down menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "ASSET_MENU",
          options: function () {
            return getAssetMenuOptions(this);
          },
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "output_string"],
    });
  },
};

Blockly.Blocks["assets_sprite_menu"] = {
  /**
   * Sprite drop-down menu for assets.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "SPRITE_OPTION",
          options: [],
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "output_string"],
    });
  },
};

Blockly.Blocks["assets_file_as_type"] = {
  /**
   * Block to report the data of an asset
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ASSETS_FILE_AS_TYPE,
      args0: [
        {
          type: "input_value",
          name: "ASSET_MENU",
        },
        {
          type: "field_dropdown",
          name: "TYPE",
          options: [
            [Blockly.Msg.ASSETS_FILE_AS_TYPE_TEXT, "text"],
            [Blockly.Msg.ASSETS_FILE_AS_TYPE_DATA_URI, "data: uri"],
          ],
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "output_string"],
    });
  },
};

Blockly.Blocks["assets_all"] = {
  /**
   * Block to report all asset names in a sprite
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ASSETS_ALL,
      args0: [
        {
          type: "input_value",
          name: "SPRITE",
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "output_array"],
    });
  },
};

Blockly.Blocks["assets_metadata"] = {
  /**
   * Block to report the metadata of an asset
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ASSETS_METADATA,
      args0: [
        {
          type: "field_dropdown",
          name: "TYPE",
          options: [
            [Blockly.Msg.ASSETS_METADATA_NAME, "name"],
            [Blockly.Msg.ASSETS_METADATA_EXTENSION, "extension"],
            [Blockly.Msg.ASSETS_METADATA_CONTENT_TYPE, "content type"],
            [Blockly.Msg.ASSETS_METADATA_LAST_MODIFIED, "last modified"],
            [Blockly.Msg.ASSETS_METADATA_MD5, "md5"],
          ],
        },
        {
          type: "input_value",
          name: "ASSET_MENU",
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "output_string"],
    });
  },
};

Blockly.Blocks["assets_set"] = {
  /**
   * Block to set a piece of metadata in an asset
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ASSETS_SET,
      args0: [
        {
          type: "field_dropdown",
          name: "TYPE",
          options: [
            [Blockly.Msg.ASSETS_METADATA_NAME, "name"],
            [Blockly.Msg.ASSETS_METADATA_EXTENSION, "extension"],
            [Blockly.Msg.ASSETS_METADATA_CONTENT_TYPE, "content type"],
          ],
        },
        {
          type: "input_value",
          name: "ASSET_MENU",
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "shape_statement"],
    });
  },
};

Blockly.Blocks["assets_write"] = {
  /**
   * Block to set the content of an asset
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ASSETS_WRITE,
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "field_dropdown",
          name: "TYPE",
          options: [
            [Blockly.Msg.ASSETS_FILE_AS_TYPE_TEXT, "text"],
            [Blockly.Msg.ASSETS_FILE_AS_TYPE_DATA_URI, "data: uri"],
          ],
        },
        {
          type: "input_value",
          name: "ASSET_MENU",
        },
      ],
      category: Blockly.Categories.assets,
      extensions: ["colours_assets", "shape_statement"],
    });
  },
};
