import sys
from PySide6 import QtCore, QtWidgets, QtGui
import PySide6.QtCore
import PySide6.QtWidgets

class InteractiveSceneUI(object):
    def setup(self, InteractiveScene):
        self.testLabel = QtWidgets.QLabel("test2")

        self.interactiveSceneLayoutContainer = QtWidgets.QWidget()
        self.interactiveSceneLayout = QtWidgets.QGridLayout(self.interactiveSceneLayoutContainer)

        self.interactiveSceneLayout.addChildWidget(self.testLabel)