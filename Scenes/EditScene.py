import sys
from PySide6 import QtCore, QtWidgets, QtGui
import PySide6.QtCore
import PySide6.QtWidgets

class EditSceneUI(object):
    def setup(self, EditScene):
        #create buttons, labels, etc objects
        self.testLabel = QtWidgets.QLabel("edit scene")
    

        #initialize layout
        self.EditSceneLayoutContainer = QtWidgets.QWidget()
        self.EditSceneLayout = QtWidgets.QGridLayout(self.EditSceneLayoutContainer)

        #add widgets after layout is initialized
        self.EditSceneLayout.addChildWidget(self.testLabel)