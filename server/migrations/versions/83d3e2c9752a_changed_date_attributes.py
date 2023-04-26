"""changed date attributes

Revision ID: 83d3e2c9752a
Revises: 0c2c14dc302d
Create Date: 2023-04-25 22:21:35.098452

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '83d3e2c9752a'
down_revision = '0c2c14dc302d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shifts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_date_time', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('end_date_time', sa.DateTime(), nullable=True))
        batch_op.drop_column('time')
        batch_op.drop_column('date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shifts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.DATETIME(), nullable=True))
        batch_op.add_column(sa.Column('time', sa.DATETIME(), nullable=True))
        batch_op.drop_column('end_date_time')
        batch_op.drop_column('start_date_time')

    # ### end Alembic commands ###
